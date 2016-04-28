import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

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
  }
});

Template.PatientCard.events({
  'click .btn-complete-visit'(event, instance) {
    event.preventDefault();
    instance.state.set('visitComplete',!instance.state.get('visitComplete'));
    
  }
});
