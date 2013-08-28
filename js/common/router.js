define(function (require) {

    var util = require('common/util');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            ':appId/:pageId/*params': 'loadAppPage',
            ':appId/': 'loadApp',
            ':appId': 'loadApp',
            ':appId/:pageId': 'loadAppPage',
            ':appId/:pageId/': 'loadAppPage'

        },
        index: function () {

            require(['common/app'],function(app){
                app.router.navigate('#studio', {trigger: true});
            });

        },
        loadAppPage: function (appId, pageId, params) {

            require(['common/app'],function(baseApp){
                var paramsObject = util.paramsToObject(params);
                paramsObject.appId = appId;
                paramsObject.pageId = pageId;
                baseApp.appModel.set(paramsObject);
            });
        },
        loadApp:function(appId, pageId, params){
            require(['common/app'],function(baseApp){
                var paramsObject = util.paramsToObject(params);
                paramsObject.appId = appId;
                paramsObject.pageId = pageId;
                baseApp.appModel.set(paramsObject);
            });
        }
    });

    return Router;

})