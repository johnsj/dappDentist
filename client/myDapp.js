
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

    var toggleClass = function(className) {
      if (_.contains(e.target.classList, className)){
        e.target.classList.remove(className);
      } else {
        var allClasses = ['tooth-fill', 'tooth-missing'];
        _.each(allClasses, function(klass) {
          e.target.classList.remove(klass);
        })
        e.target.classList.add(className);
      };

      $.contextMenu( 'destroy', '.tooth');
    }

    $.contextMenu({
        selector: '.tooth',
        trigger: 'left',
        items: {
            "tooth-fill": {name: "Tooth Fill", callback: function(key, options) {
              toggleClass('tooth-fill');
            }}
            ,"tooth-missing": {name: "Tooth Missing", callback: function (key, options) {
              toggleClass('tooth-missing');
            }}
        }
    });

  }
});
