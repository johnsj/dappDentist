var imageStore = new FS.Store.FileSystem("images", {path: Meteor.settings.private.uploadPath});

Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update':function () {
    return true;
  },
  'remove': function () {
    return true;
  }
});
