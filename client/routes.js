FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout",{main: 'dentalLayout'});
    }
});

FlowRouter.route('/upload', {
    action: function() {
        BlazeLayout.render("mainLayout",{main: 'fileUploadLayout'});
    }
});
