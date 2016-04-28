import { Template } from 'meteor/templating';

Template.dentalFileUpload.events({
  'change .fileUpload': function(event, template) {
    console.log(Images);
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        console.log(err, fileObj);
      });
    });
  }
});
