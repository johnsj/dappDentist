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

FlowRouter.route('/search', {
    action: function() {
        BlazeLayout.render("mainLayout",{main: 'patientsLayout'});
    }
});
