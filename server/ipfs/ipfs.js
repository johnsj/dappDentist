import { IpfsConnector } from 'meteor/akasha:meteor-ipfs';
import fs from 'fs';
import path from 'path';
import {archiveLocation, uploadLocation} from '../const.js';


class IPFS {
  constructor() {
    this.ipfsObj = IpfsConnector.getInstance();
    this.started = this.ipfsObj.start();
  }

  retrieveData(patient_id, ipfshash){
    return new Promise((resolve, reject)=>{
      let ipfsObj = this.ipfsObj;
      if (this.started) {
        ipfsObj.api.cat(ipfshash,(err, res) => {
          if (err) {
            reject(err);
          } else {

            if (res.readable) {
              let location = Meteor.absolutePath + "/archives/"+ patient_id +".zip";
              let write = fs.createWriteStream(location);
              res.pipe(write);
              res.on('end',()=>{
                write.end();
                resolve(location);
              })
            }


            // resolve(res);
          }
        });
      };
    });
  }

  distributeData(query){
    return new Promise((resolve, reject) => {
      let ipfsObj = this.ipfsObj;

      if (this.started) {
        fs.readFile(archiveLocation + `${query}.zip`,(fsErr, fsData)=>{
          if (!fsErr) {

            ipfsObj.api.add(fsData, (err, data)=>{
              if(!err){
                resolve(data);
              } else {
                reject(err);
              }
            });

          } else {
            reject(err);
          };
        });
      }
    });
  }
}


export let ipfs = new IPFS();
