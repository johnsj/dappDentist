import IPFS from 'ipfs-api';

if(typeof web3 === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

EthBlocks.init();
EthAccounts.init();

ipfs = IPFS({host: 'localhost', port: '5001', procotol: 'http'});
