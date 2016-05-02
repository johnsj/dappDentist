import { IpfsConnector } from 'meteor/akasha:meteor-ipfs';
import fs from 'fs';
import path from 'path';

ipfsObj = false;

const testIpfs = function () {
  // start ipfs daemon
  let started = ipfsObj.start();
  // wait for process to start
  if (started) {
    // test api calls https://www.npmjs.com/package/ipfs-api
    // ipfsObj.api.add(new Buffer('random stuff'), (err, data)=> {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log('ipfs hash ' + data[0].Hash);
    //   }
    // });

    fs.readFile('archives/out.zip',(fsErr, fsData)=>{
      if (!fsErr) {

        ipfsObj.api.add(fsData, (err, data)=>{
          if(!err){
            console.log(data);
            console.log('IPFS Hash: ' + data[0].Hash);
          } else {
            console.log(err);
          }
        });

      } else {
        console.log(fsErr);
      };
    });

  }
};

Meteor.startup(function () {
  ipfsObj          =  IpfsConnector.getInstance(); //singleton
  ipfsObj.setLogLevel('info'); // info is default
  // testIpfs();
});
