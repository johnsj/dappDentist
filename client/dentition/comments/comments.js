import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

//Temporary array for UI prototyping
let allComments = [
  {
    doctor: 'Dr. Feelgood',
    date: new Date(),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere nibh non purus lacinia, in interdum lectus finibus. Nulla facilisi. Curabitur tincidunt bibendum turpis, vitae semper mi. Praesent viverra tortor a nisi rutrum, eu hendrerit nulla tincidunt. Donec gravida sagittis bibendum. Maecenas eu odio suscipit, gravida lectus id, fringilla dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum et nulla at lorem semper condimentum. Nam ligula ex, pretium ac tempor sed, aliquam vel tellus. Aenean ornare urna at nulla bibendum efficitur. Nam ac risus quis felis blandit semper ac in sem. Vestibulum tempor leo id risus placerat, nec pretium massa porttitor. Suspendisse auctor justo vitae congue faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra tincidunt risus at rhoncus. Aenean convallis ex sit amet commodo commodo. Mauris ut gravida nisl. Vestibulum commodo leo est, in scelerisque ante mollis sed. Maecenas eu dignissim."
  },
  {
    doctor: 'Dr. Feelgood',
    date: new Date(),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere nibh non purus lacinia, in interdum lectus finibus. Nulla facilisi. Curabitur tincidunt bibendum turpis, vitae semper mi. Praesent viverra tortor a nisi rutrum, eu hendrerit nulla tincidunt. Donec gravida sagittis bibendum. Maecenas eu odio suscipit, gravida lectus id, fringilla dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum et nulla at lorem semper condimentum. Nam ligula ex, pretium ac tempor sed, aliquam vel tellus. Aenean ornare urna at nulla bibendum efficitur. Nam ac risus quis felis blandit semper ac in sem. Vestibulum tempor leo id risus placerat, nec pretium massa porttitor. Suspendisse auctor justo vitae congue faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra tincidunt risus at rhoncus. Aenean convallis ex sit amet commodo commodo. Mauris ut gravida nisl. Vestibulum commodo leo est, in scelerisque ante mollis sed. Maecenas eu dignissim."
  },
  {
    doctor: 'Dr. Feelgood',
    date: new Date(),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere nibh non purus lacinia, in interdum lectus finibus. Nulla facilisi. Curabitur tincidunt bibendum turpis, vitae semper mi. Praesent viverra tortor a nisi rutrum, eu hendrerit nulla tincidunt. Donec gravida sagittis bibendum. Maecenas eu odio suscipit, gravida lectus id, fringilla dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum et nulla at lorem semper condimentum. Nam ligula ex, pretium ac tempor sed, aliquam vel tellus. Aenean ornare urna at nulla bibendum efficitur. Nam ac risus quis felis blandit semper ac in sem. Vestibulum tempor leo id risus placerat, nec pretium massa porttitor. Suspendisse auctor justo vitae congue faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra tincidunt risus at rhoncus. Aenean convallis ex sit amet commodo commodo. Mauris ut gravida nisl. Vestibulum commodo leo est, in scelerisque ante mollis sed. Maecenas eu dignissim."
  },
];

Template.Comments.helpers({
  comments(){
    //TODO
    //add logic to retrieve comments from DB
    return allComments;
  }
})

Template.CommentsForm.events({
  'submit #journalForm'(events){
    events.preventDefault();

    let newElement = {
      doctor: 'Dr. Feelgood',
      date: new Date(),
      text: $('#journalText').val()
    }

    //TODO
    //Add logic for adding comment to DB

    $('#journalText').val('');
    $('#journalText').trigger('autoresize');
  }
})
