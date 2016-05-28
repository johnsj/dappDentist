import { Meteor } from 'meteor/meteor';
import { Patients } from '../collections/patients.js';
import { Dentitions } from '../collections/dentitions.js';
import { Comments } from '../collections/comments.js';
import { Images } from '../collections/images.js';
import { ipfs } from './ipfs/ipfs.js';
import fs from 'fs';
import path from 'path';
import decompressZip from 'decompress-zip';
import { zipWrapper } from './export/zipWrapper.js';
import { journalDbContract } from './journalDbContract.js';
import {archiveLocation, archiveDownLocation, uploadLocation} from './const.js';

class blockchainConnector {

  distributeToIPFS(query){
    return new Promise((resolve, reject)=>{
      let contract = new journalDbContract();

      let zipfile = new zipWrapper(query);
      zipfile.addCollection(Dentitions);
      zipfile.addCollection(Comments);
      zipfile.addImageCollection(Images);
      zipfile.generateZipArchive();
      let dataHash = ipfs.distributeData(query).then((res)=>{
        let resultUpload = contract.updateJournal(query, res[0].Hash);
        console.log(res[0].Hash);
        resultUpload.then((res) => {;
          resolve(res);
          // let resultGet = contract.getJournal(query);
          // resultGet.then((res) => {});
        });
      });
    });
  }

  unzipFiles(patient_id){
    let self = this;
    return new Promise((resolve, reject)=>{

      let contract = new journalDbContract();
      let resultGet = contract.getJournal(patient_id);
      let newLocation = archiveDownLocation + patient_id + "~/";

      resultGet.then((hash)=>{
        // console.log("getting hash:", hash);
        ipfs.retrieveData(patient_id, hash).then((location)=>{
          let unzipper = new decompressZip(location);
          unzipper.extract({
            path: newLocation
          });
          unzipper.on('extract', function (log) {
            console.log("Files extracted:", log);
            resolve(patient_id);
          })
          unzipper.on('error', function (err) {
            console.log("decompressZip:",err);
            reject(err);
          })
        }).catch((err)=>{
          console.log(err);
        });
      });
    });
  }

  readFilesIntoDb(patient_id){
    return new Promise((resolve, reject)=>{

        let folderLocation = archiveDownLocation + patient_id + "~/";

        let importComments = (filelocation) => {
          console.info("Loaded comments file");
          let filecontent = fs.readFileSync(filelocation);
          let jsoncontent = JSON.parse(filecontent);

          Comments.remove({patient_id: patient_id});

          jsoncontent.forEach((comment)=>{
            Comments.insert(comment);
          });

        }

        let importDentitions = (filelocation) => {
          console.info("Loaded dentitions file");
          let filecontent = fs.readFileSync(filelocation);
          let jsoncontent = JSON.parse(filecontent);

          Dentitions.remove({patient_id: patient_id});

          jsoncontent.forEach((comment)=>{
            Dentitions.insert(comment);
          });

        }

        let readJson = (file) => {

          var commentPattern = new RegExp('^'+'comments', 'i');
          if (commentPattern.test(file)) {
            importComments(folderLocation + file);
          }

          var dentitionPattern = new RegExp('^'+'dentitions', 'i');
          if (dentitionPattern.test(file)) {
            importDentitions(folderLocation + file);
          }

        }

        let readImages = (image) => {
          console.info("Loaded image");

          // let imageFile = fs.readFileSync(folderLocation+image);

          let newFile = new FS.File(folderLocation+image);
          newFile.metadata = {
            patient_id: patient_id
          }
          Images.insert(newFile, function (err, fileObj) {
            if (err) {
              reject(err)
            }
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            // console.log(err, fileObj);
          });
        }

        let files = fs.readdirSync(folderLocation);
        Images.remove({'metadata.patient_id': patient_id});
        files.forEach((file, indx, arr)=>{
          switch (path.extname(file)) {
            case '.json':
              readJson(file);
              break;
            case '.jpg':
              readImages(file);
              break;
            default:
          }
          if (indx == arr.length - 1) {
            resolve("Files inserted");
          }
        });
    });
  }
}

// let bc = new blockchainConnector()

// bc.distributeToIPFS('0x0806c0f5948ce8f3fb7e5a25108bd804b203cbea');

// bc.unzipFiles('0x0806c0f5948ce8f3fb7e5a25108bd804b203cbea');

// bc.readFilesIntoDb("0x0806c0f5948ce8f3fb7e5a25108bd804b203cbea");

Meteor.methods({
  distributeToIPFS: function (patient_id) {
    return new Promise((resolve, reject)=>{
      if (web3.isAddress(patient_id)) {
        let bc = new blockchainConnector();
        bc.distributeToIPFS(patient_id).then((res)=>{
          resolve(res);
        })
        .catch((err)=>{console.log(err)});
      } else {
        reject();
      }
    })
  },
  getDataFromIPFS: function (patient_id) {
    return new Promise((resolve, reject)=>{
      if (web3.isAddress(patient_id)) {
        let bc = new blockchainConnector();
        bc.unzipFiles(patient_id)
          .then(resolve)
          .catch((err)=>{console.log(err)});
      } else {
        reject();
      }

    });
  },
  readFilesIntoDb: function(patient_id) {
    return new Promise((resolve, reject)=>{
      if (web3.isAddress(patient_id)) {
        let bc = new blockchainConnector();
        bc.readFilesIntoDb(patient_id)
          .then(resolve)
          .catch((err)=>{console.log(err)});
      } else {
        reject();
      }
    });
  }
});
