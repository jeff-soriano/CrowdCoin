import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xB798f0547a02612b205B79e8DA1C0AfE526eDA42'
);

export default instance;