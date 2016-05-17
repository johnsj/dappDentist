import { Meteor } from 'meteor/meteor';

var imageStore = new FS.Store.FileSystem("images", {path: Meteor.absolutePath + '/uploads'});

export const Images = new FS.Collection("images", {
  stores: [imageStore]
});
