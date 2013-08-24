define(function(require){

    var baseApp = require('common/app'),util = require('common/util'), dashboard = require('./pages/dashboard'), reporting = require('./pages/reporting');

    var app = _.extend({},baseApp,{
        test:function(){
            console.log('testing advertiser app');
        },
        defaultPage:'dashboard',
        renderPage:function(pageId, params){

            if(!pageId){
                pageId = this.defaultPage
            }

            require(['./pages/'+pageId],function(Page){
                var view = new Page.View({
                    model:new Page.Model(params)
                })
                var el = $(baseApp.appBody);
                el.html(view.render().el);
            })

        }
    });


    return app;

});