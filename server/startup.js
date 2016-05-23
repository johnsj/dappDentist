import { Web3 } from 'meteor/ethereum:web3';

Meteor.startup(()=>{
  if(typeof web3 === 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
  web3.eth.defaultAccount = Meteor.settings.private.coinbase;
})
