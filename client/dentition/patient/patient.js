import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Patients } from '../../../collections/patients.js';

import classnames from 'classnames';

Template.PatientCard.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('visitComplete', false);
});

Template.PatientCard.helpers({
  isVisitComplete(){
    return Template.instance().state.get('visitComplete');
  },

  visitCSSClass(){
    let classname = classnames({
      red: !Template.instance().state.get('visitComplete'),
      green: Template.instance().state.get('visitComplete')
    })

    return classname;
  },
  patient(){
    return Patients.findOne({patient_id: FlowRouter.getParam('patient_id')});
  }
});

Template.PatientCard.events({
  'click .btn-complete-visit'(event, instance) {
    event.preventDefault();
    instance.state.set('visitComplete',!instance.state.get('visitComplete'));
  },
  'click #publishToIPFS'(event, instance){
    event.preventDefault();
    // console.log(instance);
    Meteor.call('distributeToIPFS', FlowRouter.getParam('patient_id'),function(err, res){
      if (!err) {
        instance.state.set('visitComplete',!instance.state.get('visitComplete'));
      }
    });
  },
  'click #getDataFromIPFS'(event, instance){
    Meteor.callPromise('getDataFromIPFS', FlowRouter.getParam('patient_id')).then((res)=>{
      Meteor.callPromise('readFilesIntoDb', res).then((res)=>{
        console.log(res);
        window.location.reload()
      });
    });

    // Meteor.call('getDataFromIPFS', FlowRouter.getParam('patient_id'), function (err, res) {
    //   if (!err) {
    //     console.log(res);
    //   }
    // });
  }
});
