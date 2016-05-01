import { Template } from 'meteor/templating';

Template.dentalFileUpload.events({
  'change .fileUpload': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      let patient_id = FlowRouter.getParam('patient_id');
      let newFile = new FS.File(file);
      newFile.metadata = {
        patient_id: patient_id
      }
      Images.insert(newFile, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        // console.log(err, fileObj);
      });
    });
  }
});
