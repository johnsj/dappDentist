import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Dentitions } from '../../../collections/dentitions.js';

Template.dentition.onRendered(function () {
  console.log('onRendered');
  let teeth = Dentitions.find({
    patient_id: 'TESTPATIENT'
  });
  Meteor.setTimeout(function() {
    teeth.forEach(function (tooth) {
      console.log(tooth);

      document.getElementById(tooth.tooth).classList.add(tooth.status);

    });
  }, 100);
});

Template.dentition.events({
  'click .tooth': function(e) {

    var toggleClass = function(className) {
      if (_.contains(e.target.classList, className)){

        let checkId = Dentitions.findOne({
          patient_id: "TESTPATIENT",
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
          patient_id: "TESTPATIENT",
          tooth: e.target.id});

        if (checkId != null){
            Dentitions.update({_id: checkId._id},{
              $set:{
                status: className
              }
            });
        } else {
          Dentitions.insert({
            patient_id: "TESTPATIENT",
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
