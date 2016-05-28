import { IpfsConnector } from 'meteor/akasha:meteor-ipfs';
import fs from 'fs';
import path from 'path';
import {archiveLocation, archiveDownLocation, uploadLocation} from '../const.js';


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
              let location = archiveDownLocation + patient_id +".zip";
              let write = fs.createWriteStream(location);
              res.pipe(write);
              res.on('data',(chunk)=>{
                // console.log("Got %d bytes of data", chunk.length);
              })
              res.on('end',()=>{
                // console.log("Finished reading file");
                resolve(location);
              })

              write.on('error', (err)=>{
                reject("Write:", err);
              })
              write.on('finish', ()=>{
                // console.log("Finished writing file");
              })
            }
          }
        });
      };
    });
  }

  distributeData(query){
    return new Promise((resolve, reject) => {
      let ipfsObj = this.ipfsObj;

      if (this.started) {

        let fileContent = fs.readFileSync(archiveLocation + `${query}.zip`);

        ipfsObj.api.add(fileContent, (err, data)=>{
          if(!err){
            resolve(data);
          } else {
            reject(err);
          }
        });

        // fs.readFile(archiveLocation + `${query}.zip`,(fsErr, fsData)=>{
        //   if (!fsErr) {
        //     console.log(fsData);
        //
        //     ipfsObj.api.add(fsData, (err, data)=>{
        //
        //       if(!err){
        //         resolve(data);
        //       } else {
        //         reject(err);
        //       }
        //     });
        //
        //   } else {
        //     reject(fsErr);
        //   };
        // });
      }
    });
  }
}


export let ipfs = new IPFS();
