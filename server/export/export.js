// Based on the article from:
// https://themeteorchef.com/recipes/exporting-data-from-your-meteor-application/

// TODO
// add image files to zip

import { Meteor } from 'meteor/meteor';
import json2xml from 'json2xml';
import jsZip from 'jszip';
import fs from 'fs';
import { Dentitions } from '../../collections/dentitions.js';

let _initializeZipArchive = () => {
  return new jsZip();
};

let _prepareDataForArchive = (archive) => {
  let data = getData('TESTPATIENT');
  _addToArchive(archive, 'TESTPATIENT'+'.json', JSON.stringify(data));
}

let _addToArchive = (archive, filename, contents) => {
  archive.file(filename, contents);
}

let _generateZipArchive = (archive) => {
  // archive.generateNodeStream( { streamfiles: true } )
  //   .pipe(fs.createWriteStream('archives/out.zip'))
  //   .on('end', function () {
  //     console.log('out.zip written');
  //     return true;
  //   });

  archive.generateAsync({type:'nodebuffer'})
    .then(function(contents) {
      fs.writeFile("archives/out.zip", contents, function(err) {
        if(!err){
          console.log('written');
        } else {
          console.log(err);
        }
      })
    })
}

let _compileZip = (archive) => {
  _prepareDataForArchive(archive);
}

let exportData = () => {
  let archive = _initializeZipArchive();
  _compileZip(archive);
  return _generateZipArchive(archive);
}

let _getData = (patient_id) => {
  return Dentitions.find({patient_id: patient_id}).fetch();
}

let _cleanDataIds = (data) => {
  data.forEach(function (item) {
    delete item._id;
  })
  return data;
}

let getData = function (patient_id) {
  let data = _getData(patient_id);
  data = _cleanDataIds(data);
  return data;
}

Meteor.methods({
  testExport(){
    let data = getData('TESTPATIENT');
    return JSON.stringify(data);
  },
  testZip(){
    exportData();
    return true;
  }
});
