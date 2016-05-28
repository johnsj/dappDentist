import { Web3 } from 'meteor/ethereum:web3';
import fs from 'fs';
import {archiveLocation, archiveDownLocation, uploadLocation} from './const.js';

Meteor.startup(()=>{

  fs.stat(archiveLocation,(err, stat) => {
    if (err) {
      fs.mkdirSync(archiveLocation);
    }
  });
  fs.stat(archiveDownLocation,(err, stat) => {
    if (err) {
      fs.mkdirSync(archiveDownLocation);
    }
  });
  fs.stat(uploadLocation,(err, stat) => {
    if (err) {
      fs.mkdirSync(uploadLocation);
    }
  });


  if(typeof web3 === 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
  web3.eth.defaultAccount = Meteor.settings.private.coinbase;


})
