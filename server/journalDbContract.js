import { Meteor } from 'meteor/meteor';
import { Web3 } from 'meteor/ethereum:web3';
import fs from 'fs';

if(typeof web3 === 'undefined') {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

export class journalDbContract {
  constructor() {
    this.contractABI = [{"constant":false,"inputs":[{"name":"patient","type":"address"}],"name":"getJournal","outputs":[{"name":"res","type":"bytes"}],"type":"function"},{"constant":false,"inputs":[{"name":"patient","type":"address"},{"name":"hash","type":"bytes"}],"name":"updateJournal","outputs":[{"name":"res","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"patient","type":"address"},{"indexed":true,"name":"hash","type":"bytes"}],"name":"journalUpdated","type":"event"}];
    this.contract = web3.eth.contract(this.contractABI);
    this.contractInstance = this.contract.at(Meteor.settings.private.contractAddress);
    web3.eth.defaultAccount = web3.eth.coinbase;

  }

  getJournal(patient){
    return new Promise((resolve, reject) => {
      this.contractInstance.getJournal.call(patient, (err, res) => {
        if (err) {
          reject(err);
        } else {
          // resolve( res );
          resolve( web3.toUtf8( res ) );
        }
      });
    })
  }

  updateJournal(patient, hash){
    return new Promise((resolve, reject) => {
      this.contractInstance.updateJournal.sendTransaction(patient, hash, {gas: 100000}, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res)
        }
      });
    });
  }

  // watch(){
  //   let filter = this.contractInstance.journalUpdated({},{fromBlock:0, toBlock:"latest"});
  //   console.log(filter);
  //   filter.get((err, res)=>{
  //     if (!err) {
  //       console.log(res);
  //     }
  //   });
  // }
}
