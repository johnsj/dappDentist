import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Web3 } from 'meteor/ethereum:web3';

Template.EthereumLayout.onCreated(function () {
  this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
});

Template.EthereumLayout.onDestroyed(function () {
  delete Template.instance().web3;
});

Template.EthereumLayout.helpers({
  accounts(){
    let web3 = Template.instance().web3;
    return web3.eth.accounts;
  },
  coinbase(){
    let web3 = Template.instance().web3;
    return web3.eth.coinbase;
  }
});

Template.EthereumLayout.events({

});
