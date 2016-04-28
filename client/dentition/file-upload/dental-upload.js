import { Template } from 'meteor/templating';

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "/uploads/"})]
});

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
