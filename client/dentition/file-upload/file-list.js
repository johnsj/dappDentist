import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Images } from '../../../collections/images.js'

Template.dentalFileList.onRendered(function () {
  $('.materialboxed').materialbox();
})

Template.dentalFileList.helpers({
  imageList(){
    let patient_id = FlowRouter.getParam('patient_id');

    let res = Images.find({'metadata.patient_id': patient_id}).fetch();

    return res;
  }
});

Template.dentalFileList.events({
  'click .removeImage'(event){
    event.preventDefault();
    Images.remove(this._id);
  }
});
