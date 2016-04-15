
// Template.accounts.helpers({
//     listAccounts: function () {
//         return EthAccounts.find().fetch();
//     },
//     latestBlock: function () {
//         return EthBlocks.latest
//     }
// });
//
//
// Template.accountDetails.onRendered(function () {
//     var template = Template.instance();
//     var tokenInstance = TokenContract.at("0x938564f4736b18064d4e03ed2da235380ae48890");
//     var templateAddress = Template.currentData().address;
//
//     tokenInstance.coinBalanceOf(templateAddress, function (err, balance) {
//         TemplateVar.set(template, "currentTokenBalance", balance);
//     });
// });

Template.dentition.events({
  'click .tooth': function(e) {
    if (_.contains(e.target.classList, 'tooth-fill')){
      e.target.classList.remove('tooth-fill');
    } else {
      e.target.classList.add('tooth-fill');
    }
  }
});


$(function() {
     $.contextMenu({
         selector: '.tooth',
         callback: function(key, options) {
             var m = "clicked: " + key;
             window.console && console.log(m) || alert(m);
         },
         items: {
             "edit": {name: "Edit", icon: "edit"},
             "cut": {name: "Cut", icon: "cut"},
            copy: {name: "Copy", icon: "copy"},
             "paste": {name: "Paste", icon: "paste"},
             "delete": {name: "Delete", icon: "delete"},
             "sep1": "---------",
             "quit": {name: "Quit", icon: function(){
                 return 'context-menu-icon context-menu-icon-quit';
             }}
         }
     });

     $('.context-menu-one').on('click', function(e){
         console.log('clicked', this);
     })
 });
