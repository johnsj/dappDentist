import { Meteor } from 'meteor/meteor';
import { Patients } from '../collections/patients.js';
import { Dentitions } from '../collections/dentitions.js';
import { Comments } from '../collections/comments.js';
import { Images } from '../collections/images.js';
import { ipfs } from './ipfs/ipfs.js';
import fs from 'fs';
import path from 'path';
import { zipWrapper, Unzipper } from './export/zipWrapper.js';
import { journalDbContract } from './journalDbContract.js';

class blockchainConnector {

  static distributeToIPFS(query){
    let contract = new journalDbContract();

    let zipfile = new zipWrapper(query);
    zipfile.addCollection(Dentitions);
    zipfile.addCollection(Comments);
    zipfile.addImageCollection(Images);
    zipfile.generateZipArchive();
    let dataHash = ipfs.distributeData(query).then((res)=>{
      console.log(res[0].Hash);
      let resultUpload = contract.updateJournal(query, res[0].Hash);
      resultUpload.then((res) => {
        console.log(res);
        let resultGet = contract.getJournal(query);
        resultGet.then((res) => console.log("getJournal:", res));
      });
    });
  }

  static unzipFiles(patient_id){
    let contract = new journalDbContract();
    let resultGet = contract.getJournal(patient_id);
    let newLocation = Meteor.absolutePath + "/archives/" + patient_id + "/";

    resultGet.then((hash)=>{
      ipfs.retrieveData(patient_id, hash).then((location)=>{
        let zip = new Unzipper(location);
        zip.extractAllTo(newLocation)
      });
    });
  }

  static readFilesIntoDb(patient_id){
    let folderLocation = Meteor.absolutePath + "/archives/" + patient_id + "/";

    let importComments = (filelocation) => {
      let filecontent = fs.readFileSync(filelocation);
      let jsoncontent = JSON.parse(filecontent);

      Comments.remove({patient_id: patient_id});

      jsoncontent.forEach((comment)=>{
        Comments.insert(comment);
      });

    }

    let importDentitions = (filelocation) => {
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

      // let imageFile = fs.readFileSync(folderLocation+image);

      let newFile = new FS.File(folderLocation+image);
      newFile.metadata = {
        patient_id: patient_id
      }
      Images.insert(newFile, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        // console.log(err, fileObj);
      });
    }

    let files = fs.readdirSync(folderLocation);
    Images.remove({'metadata.patient_id': patient_id});
    files.forEach((file)=>{
      switch (path.extname(file)) {
        case '.json':
          readJson(file);
          break;
        case '.jpg':
          readImages(file);
          break;
        default:
      }
    })
  }
}

// distributeToIPFS('0x0806c0f5948ce8f3fb7e5a25108bd804b203cbea');

// unzipFiles("0x0806c0f5948ce8f3fb7e5a25108bd804b203cbea");

// readFilesIntoDb("0x0806c0f5948ce8f3fb7e5a25108bd804b203cbea");
