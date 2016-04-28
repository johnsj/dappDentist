import { Template } from 'meteor/templating';

Template.dentition.events({
  'click .tooth': function(e) {

    var toggleClass = function(className) {
      if (_.contains(e.target.classList, className)){
        e.target.classList.remove(className);
      } else {
        var allClasses = ['tooth-fill', 'tooth-missing'];
        _.each(allClasses, function(klass) {
          e.target.classList.remove(klass);
        })
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
