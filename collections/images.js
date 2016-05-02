var imageStore = new FS.Store.FileSystem("images", {path: process.env.PWD+'/uploads'});

export const Images = new FS.Collection("images", {
  stores: [imageStore]
});
