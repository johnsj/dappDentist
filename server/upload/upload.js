var imageStore = new FS.Store.FileSystem("images", {path: "C:\\Users\\john_\\Documents\\Development\\Ethereum\\dappDentist\\uploads"});

Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});
