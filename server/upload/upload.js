import { Meteor } from 'meteor/meteor';

var archiveStore = new FS.Store.FileSystem("archives", {path: Meteor.absolutePath + '/archives'});

Archives = new FS.Collection("archives", {
  stores: [archiveStore]
});
