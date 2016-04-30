import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Comments } from '../../../collections/comments.js';

Template.CommentsList.helpers({
  comments(){
    let current_patient_id = FlowRouter.getParam('patient_id');
    return Comments.find({patient_id: current_patient_id},{sort:{date:-1}});
  }
})

Template.CommentsForm.events({
  'submit #journalForm'(events){
    events.preventDefault();
    let current_patient_id = FlowRouter.getParam('patient_id');
    let newElement = {
      patient_id: current_patient_id,
      doctor: 'Dr. Feelgood',
      date: new Date(),
      text: $('#journalText').val()
    }

    Comments.insert(newElement);

    $('#journalText').val('');
    $('#journalText').trigger('autoresize');
  }
})
