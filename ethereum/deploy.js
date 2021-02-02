const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const util = require('util');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: 'trial light manual mix space update pond coil exclude report stable solution naive wife mixed select left caution girl system surface group tonight raw',
    },
    providerOrUrl: 'https://rinkeby.infura.io/v3/9b3cbaa24bbf4b55909e752e91ed67b8',
});
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '2000000' });

    console.log(util.inspect(compiledFactory.abi, { showHidden: false, depth: null }));
    console.log('Contract deployed to', result.options.address);
};

deploy().then(() => console.log('Deployment finished'));

// [
//     {
//       inputs: [
//         {
//           internalType: 'uint256',
//           name: 'minContribution',
//           type: 'uint256'
//         }
//       ],
//       name: 'createCampaign',
//       outputs: [],
//       stateMutability: 'nonpayable',
//       type: 'function',
//       constant: undefined,
//       payable: undefined,
//       signature: '0xa3303a75'
//     },
//     {
//       inputs: [ { internalType: 'uint256', name: '', type: 'uint256' 
//   } ],
//       name: 'deployedCampaigns',
//       outputs: [ { internalType: 'address', name: '', type: 'address' } ],
//       stateMutability: 'view',
//       type: 'function',
//       constant: true,
//       payable: undefined,
//       signature: '0x339d50a5'
//     },
//     {
//       inputs: [],
//       name: 'getDeployedCampaigns',
//       outputs: [ { internalType: 'address[]', name: '', type: 'address[]' } ],
//       stateMutability: 'view',
//       type: 'function',
//       constant: true,
//       payable: undefined,
//       signature: '0x4acb9d4f'
//     }
//   ]

//   0x16712e29d1D9053B3B4F1D1cC583375d50667901