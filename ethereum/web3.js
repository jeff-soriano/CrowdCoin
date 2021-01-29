import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // We are in the browser and metamask is running
    web3 = new Web3(window.ethereum);
} else {
    // We are on the server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/9b3cbaa24bbf4b55909e752e91ed67b8'
    );

    web3 = new Web3(provider);
}

export default web3;