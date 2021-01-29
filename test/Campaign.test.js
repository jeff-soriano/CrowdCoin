const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaign = require('../ethereum/build/Campaign.json');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

let accounts;
let factory;
let campaignAddress;
let campaign;
let campaignFactoryManager;
let campaignManager;
let contributor;
let recipient;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    campaignFactoryManager = accounts[0];
    campaignManager = accounts[1];
    contributor = accounts[2];
    recipient = accounts[3];

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: campaignFactoryManager, gas: '2000000' });

    await factory.methods.createCampaign('100').send({ from: campaignManager, gas: '2000000' });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {
    it('Deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('Marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();

        assert.strictEqual(campaignManager, manager);
    });

    it('Allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: contributor
        });

        const isContributor = campaign.methods.approvers(contributor).call();
        assert(isContributor);
    });

    it('Requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: contributor
            });

            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('Allows a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('Buy batteries', '0', recipient)
            .send({
                from: campaignManager,
                gas: '1000000'
            });

        const request = await campaign.methods.requests(0).call();

        assert.strictEqual('Buy batteries', request.description);
    });

    it('Processes requests', async () => {
        await campaign.methods.contribute().send({
            from: contributor,
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('Test', web3.utils.toWei('5', 'ether'), recipient)
            .send({
                from: campaignManager,
                gas: '1000000'
            });

        await campaign.methods.approveRequest(0).send({ from: contributor, gas: '1000000' });

        await campaign.methods.finalizeRequest(0).send({ from: campaignManager, gas: '1000000' });

        let balance = await web3.eth.getBalance(recipient);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 104);
    });
});