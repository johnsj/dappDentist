
// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
    counter: function () {
        return Session.get('counter');
    }
});

Template.hello.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    }
});

Template.accounts.helpers({
    listAccounts: function () {
        return EthAccounts.find().fetch();
    },
    latestBlock: function () {
        return EthBlocks.latest
    }
});


Template.accountDetails.onRendered(function () {
    var template = Template.instance();
    var tokenInstance = TokenContract.at("0x938564f4736b18064d4e03ed2da235380ae48890");
    var templateAddress = Template.currentData().address;

    tokenInstance.coinBalanceOf(templateAddress, function (err, balance) {
        TemplateVar.set(template, "currentTokenBalance", balance);
    });
});

Template.dentition.events({
  'click .tooth': function(e) {
    if (_.contains(e.target.classList, 'tooth-fill')){
      e.target.classList.remove('tooth-fill');
    } else {
      e.target.classList.add('tooth-fill');
    }
  }
});
