import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Bert } from 'meteor/themeteorchef:bert';
import { Patients } from '../../../collections/patients.js';

import classnames from 'classnames';

Template.PatientCard.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('visitComplete', false);
  this.state.set('isFetchingJournal', false);
});

Template.PatientCard.helpers({
  isVisitComplete(){
    return Template.instance().state.get('visitComplete');
  },
  isFetchingJournal(){
    return Tempate.instance().state.get('isFetchingJournal');
  },
  disabledClass(){
    let classname = classnames({
      disabled: Tempate.instance().state.get('isFetchingJournal')
    });

    return classname;
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
    Meteor.callPromise('distributeToIPFS', FlowRouter.getParam('patient_id')).then((res)=>{
      // instance.state.set('visitComplete',!instance.state.get('visitComplete'));
      Bert.alert({
        message: 'Files have uploaded to IPFS',
        type: 'info',
        style: 'growl-top-right'
      });
    });
  },
  'click #getDataFromIPFS'(event, instance){
    instance.state.set('isFetchingJournal', true);
    Bert.alert({
      message: 'Fetching journal from blockchain and IPFS',
      type: 'danger',
      style: 'growl-top-right'
    });
    Meteor.callPromise('getDataFromIPFS', FlowRouter.getParam('patient_id')).then((res)=>{
      Meteor.callPromise('readFilesIntoDb', FlowRouter.getParam('patient_id')).then((res)=>{
        console.log(res);
        instance.state.set('isFetchingJournal', false);
        window.location.reload()
        // FlowRouter.reload();
      });
    });

    // Meteor.call('getDataFromIPFS', FlowRouter.getParam('patient_id'), function (err, res) {
    //   if (!err) {
    //     console.log(res);
    //   }
    // });
  }
});
