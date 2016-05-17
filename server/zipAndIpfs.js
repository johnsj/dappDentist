import { Meteor } from 'meteor/meteor';
import { IpfsConnector } from 'meteor/akasha:meteor-ipfs';
import json2xml from 'json2xml';
import jsZip from 'jszip';
import fs from 'fs';
import { Dentitions } from '../collections/dentitions.js';
import { Comments } from '../collections/comments.js';
import { Images } from '../collections/images.js';
import { ipfsObj } from './ipfs/ipfs.js';

const archiveLocation = Meteor.absolutePath + '/archives/';
const uploadLocation = Meteor.absolutePath + '/uploads/';

let _initializeZipArchive = () => {
  return new jsZip();
};

let _addFileToArchive = (archive, filename, contents) => {
  archive.file(filename, contents);
};

let _prepareDataForArchive = (archive, collection, query, filename) => {
  let data = _cleanDataIds(_getDataFromCollection(collection, query))
  let contents = JSON.stringify(data);
  _addFileToArchive(archive, filename, contents);
}

let _cleanDataIds = (data) => {
  data.forEach(function (item) {
    delete item._id;
  })
  return data;
}

let _getDataFromCollection = (collection, query) => {
  let data = collection.find( query ).fetch();
  if (data) {
    return data;
  };
}


let _addDataToArchive = (archive, query) => {
  let formattedQuery = {patient_id: query}
  _prepareDataForArchive(archive, Dentitions, formattedQuery, "Dentitions"+query+".json");
  _prepareDataForArchive(archive, Comments, formattedQuery, "Comments"+query+".json");
  //TODO add images from collection as well
  let images = Images.find({'metadata.patient_id':query}).fetch();
  images.forEach((image)=>{
    let imgContent = fs.readFileSync(uploadLocation + image.copies.images.key);
    _addFileToArchive(archive, image.original.name, imgContent);
  });

}

let _generateZipArchive = (archive, query) => {
  archive.generateAsync({type:'nodebuffer'})
    .then(function(contents) {
      fs.writeFile(archiveLocation + query + ".zip", contents, function(err) {
        if(!err){
          console.log('Zip written to: ' + archiveLocation + query + ".zip");
        } else {
          console.log(err);
        }
      })
    })
}

let archiveData = (query) => {
  let archive = _initializeZipArchive();
  _addDataToArchive(archive, query);
  _generateZipArchive(archive, query)
}

let distributeData = (query) => {

  let ipfsObj = IpfsConnector.getInstance();

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

    fs.readFile(archiveLocation + `${query}.zip`,(fsErr, fsData)=>{
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
}

//This is what the call should look like:
let distributeToIPFS = (query) => {
  //archiveData(query);
  //distributeData(query);
}

distributeToIPFS('TESTPATIENT');
