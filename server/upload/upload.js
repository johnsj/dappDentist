var imageStore = new FS.Store.FileSystem("images", {path: Meteor.settings.private.uploadPath});

Images = new FS.Collection("images", {
  stores: [imageStore]
});
