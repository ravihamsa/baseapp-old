//Load common code that includes config, then load the app logic for this page.

require(['common'], function (base) {
    require(['apps/properties/app'], function(app){
        //app.renderPage();
    });
});
