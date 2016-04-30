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

FlowRouter.route('/patientdirectory', {
    action: function() {
        BlazeLayout.render("mainLayout",{main: 'patientDirectoryLayout'});
    }
});

FlowRouter.route('/patientdirectory/:patient_id', {
    action: function(params) {
        BlazeLayout.render("mainLayout",{main: 'dentalLayout'});
    }
});
