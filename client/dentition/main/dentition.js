import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Dentitions } from '../../../collections/dentitions.js';

Template.dentition.onRendered(function () {
  let patient_id = FlowRouter.getParam('patient_id');
  let teeth = Dentitions.find({
    patient_id: patient_id
  });
  Meteor.setTimeout(function() {
    teeth.forEach(function (tooth) {
      document.getElementById(tooth.tooth).classList.add(tooth.status);
    });
  }, 500);
});



Template.dentition.events({
  'click .tooth': function(e) {

    let patient_id = FlowRouter.getParam('patient_id');

    var toggleClass = function(className) {
      if (_.contains(e.target.classList, className)){

        let checkId = Dentitions.findOne({
          patient_id: patient_id,
          tooth: e.target.id});

        Dentitions.remove({
          _id: checkId._id
        });

        e.target.classList.remove(className);
      } else {
        var allClasses = ['tooth-fill', 'tooth-missing'];
        _.each(allClasses, function(klass) {
          e.target.classList.remove(klass);
        })

        let checkId = Dentitions.findOne({
          patient_id: patient_id,
          tooth: e.target.id});

        if (checkId != null){
            Dentitions.update({_id: checkId._id},{
              $set:{
                status: className
              }
            });
        } else {
          Dentitions.insert({
            patient_id: patient_id,
            tooth: e.target.id,
            status: className
            }
          );
        }

        e.target.classList.add(className);
      };

      $.contextMenu( 'destroy', '.tooth');
    }

    $.contextMenu({
        selector: '.tooth',
        trigger: 'left',
        items: {
            "tooth-fill": {name: "Tooth Fill", callback: function(key, options) {
              toggleClass('tooth-fill');
            }}
            ,"tooth-missing": {name: "Tooth Missing", callback: function (key, options) {
              toggleClass('tooth-missing');
            }}
        }
    });

  }
});
