import path from 'path';

var imageStore = new FS.Store.FileSystem("images", {path: path.resolve('.')+'/uploads'});
var archiveStore = new FS.Store.FileSystem("archives", {path: path.resolve('.')+'/archives'});

Images = new FS.Collection("images", {
  stores: [imageStore]
});

Archives = new FS.Collection("archives", {
  stores: [archiveStore]
});
