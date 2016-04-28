import { Template } from 'meteor/templating';

Template.dentalFileList.helpers({
  imageList(){
    return Images.find().fetch();
  }
});

Template.dentalFileList.events({
  'click .removeImage'(event){
    event.preventDefault();
    Images.remove(this._id);
  }
});
