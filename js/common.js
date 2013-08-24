//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    appDir: 'js',
    baseUrl: 'js',
    paths:{
        'text':'libs/requirejs-text-plugin'
    },
    shim:{
        'jquery':{
            exports:'$'
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});


require(['common/app', 'common/page', 'common/helpers'], function (app, MainPage) {
    var model =  new MainPage.Model();
    var view = new MainPage.View({
        model:model,
        el:$('body')
    })

    app.appModel = model;

    view.postRender();

    Backbone.history.start({
        root: this.root
    })

});
