var archiveStore = new FS.Store.FileSystem("archives", {path: process.env.PWD+'/archives'});

Archives = new FS.Collection("archives", {
  stores: [archiveStore]
});
