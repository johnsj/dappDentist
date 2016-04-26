import ipfsAPI from 'ipfs-js';

if(typeof web3 === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

EthBlocks.init();
EthAccounts.init();

window.ipfs = ipfsAPI;
window.ipfs.setProvider();

$(document).ready(function() {
  $(".button-collapse").sideNav();
})
