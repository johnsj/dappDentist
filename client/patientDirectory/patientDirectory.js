import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Patients } from '../../collections/patients.js';
import { $ } from 'meteor/jquery';

Template.patientDirectory.onRendered(function () {
  $('.modal-trigger').leanModal();
  Session.set('patientSearchQuery', null);
})

Template.patientDirectory.helpers({
  patients(){
    if (Session.get('patientSearchQuery') !== null) {

      let query = (Session.get('patientSearchQuery')) ? Session.get('patientSearchQuery').toString() : '';

      return Patients.find({
        $or:[
          {first_name: {$regex: query, $options:'i'}},
          {last_name: {$regex: query, $options:'i'}},
          {patient_id: {$regex: query, $options:'i'}}
        ]
      });
    }
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
  'click .patient_row'(event, instance){
    let patient_id = this.patient_id;
    FlowRouter.go('/patientdirectory/'+patient_id);
  }
});

Template.patientDirectorySearch.events({
  'submit #patientSearchForm'(event, template){
    event.preventDefault();
    let query = template.find('#patientSearchInput').value;
    if (query == "") {
      Session.set('patientSearchQuery', null);
    }
    Session.set('patientSearchQuery', query);
  }
});
