import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x16712e29d1D9053B3B4F1D1cC583375d50667901'
);

export default instance;