import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Patients } from '../../collections/patients.js';
import { $ } from 'meteor/jquery';

Template.patientDirectory.onRendered(function () {
  $('.modal-trigger').leanModal();
})

Template.patientDirectory.helpers({
  patients(){
    return Patients.find();
  }
})

Template.addPatientModal.events({
  'submit #addPatientForm'(event, instance){
    event.preventDefault();

    Patients.insert({
      patient_id: $('#patient_hash').val(),
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val()
    });

    $('#modal1').closeModal();
    $('#patient_hash').val('');
    $('#first_name').val('');
    $('#last_name').val('');
  }
});

Template.patientDirectoryListSingle.events({
  'dblclick .patient_row'(event, instance){
    let patient_id = this.patient_id;
    FlowRouter.go('/patientdirectory/'+patient_id);
  }
});
