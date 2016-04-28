import { Dentitions } from '../collections/dentitions.js';

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

Dentitions.allow({
  'insert':function () {
    return true;
  },
  'update':function () {
    return true;
  },
  'remove':function () {
    return true;
  }
});
