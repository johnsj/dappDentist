// Based on the article from:
// https://themeteorchef.com/recipes/exporting-data-from-your-meteor-application/

import { Meteor } from 'meteor/meteor';
import json2xml from 'json2xml';
import jsZip from 'jszip';
import { Dentitions } from '../../collections/dentitions.js';

let _initializeZipArchive = () => {
  return new jsZip();
};

let _getData = (patient_id) => {
  return Dentitions.find({patient_id: patient_id}).fetch();
}

Meteor.methods({
  testExport(){
    return JSON.stringify(_getData('TESTPATIENT'));
  }
});
