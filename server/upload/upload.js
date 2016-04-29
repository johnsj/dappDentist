import path from 'path';

var imageStore = new FS.Store.FileSystem("images", {path: path.resolve('.')+'/uploads'});

Images = new FS.Collection("images", {
  stores: [imageStore]
});
