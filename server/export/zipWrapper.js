import { Meteor } from 'meteor/meteor';
import jsZip from 'jszip';
import fs from 'fs';
import admzip from 'adm-zip';
import {archiveLocation, uploadLocation} from '../const.js'

export class Unzipper {
  constructor(location){
    this.zipInstance = new admzip(location);
  }

  extractAllTo(newLocation){
    this.zipInstance.extractAllTo(newLocation, true);
  }
}

export class zipWrapper {
  constructor(query) {
    this.zipInstance = new jsZip();
    this.query = query;
  };

  addCollection(collection){
    let formattedQuery = {patient_id: this.query};
    this._prepareDataForArchive(collection, formattedQuery, collection._name+this.query+".json");
  }

  addImageCollection(imageCollection){
    let images = imageCollection.find({'metadata.patient_id': this.query}).fetch();
    images.forEach((image)=>{
      let imageContent = fs.readFileSync(uploadLocation + image.copies.images.key);
      this._addFileToArchive(image.original.name, imageContent);
    })
  }

  _addDataToArchive(query) {
    let formattedQuery = {patient_id: query};
    let self = this;
    this.collections.forEach(function(collection){
      self._prepareDataForArchive(collection, formattedQuery, collection._name+query+".json");
    });

  }

  _prepareDataForArchive(collection, query, filename) {
    let self = this;
    let data = this._cleanDataIds(self._getDataFromCollection(collection, query));
    let contents = JSON.stringify(data);
    this._addFileToArchive(filename, contents);
  }

  _cleanDataIds(data) {
    data.forEach(function(item) {
      delete item._id;
    })
    return data;
  }

  _getDataFromCollection(collection, query) {
    let data = collection.find(query).fetch();
    if(data){
      return data;
    }
  }

  _addFileToArchive(filename, contents) {
    this.zipInstance.file(filename, contents)
  }

  generateZipArchive() {
    let query = this.query;
    this.zipInstance.generateAsync({type:'nodebuffer'})
      .then(function (contents) {
        fs.writeFile(archiveLocation + query + '.zip', contents, function (err) {
          if(err){
            console.log(err);
          } else {
            console.log('Zip file written to: ' + archiveLocation + query + '.zip');
          }
        });
      });
  }

}
