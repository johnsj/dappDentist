import { Template } from 'meteor/templating';

Template.SideNav.onRendered(function() {
  this.$(".button-collapse").sideNav({});
});
