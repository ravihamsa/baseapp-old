define(['require','common/router'], function (require, Router) {

    var hex_md5 = window.hex_md5;



    var templateIndex = {}, dataIndex = {};

    var app = {
        root: '/',
        baseUrl:'js/',
        appBody:'#app-body',
        compileTemplate: function (str) {
            return Handlebars.compile(str);
        },
        router: new Router(),
        getTemplateDef: function (template) {
            var _this = this;
            template = template || '';
            var hash = getHash(template);
            var def = getTemplateDefByHash(hash);
            if (!def) {
                def = $.Deferred();
                _this.cacheTemplate(def, hash);
                //if template is already a function, can be used for using other template engines
                if(typeof template === 'function'){
                    def.resolve(template);
                }else if(typeof  template === 'string'){
                    //app.log(template, template.length, template.indexOf('.html'));
                    //if template is an url
                    if (template.indexOf('.html') === template.length - 5) {
                        require(['text!' + template], function (txt) {
                            def.resolve(_this.compileTemplate(txt));
                        });
                    } else
                    //if template is an id of script element in html page
                    if (template.indexOf('#') === 0) {
                        def.resolve(_this.compileTemplate($(template).html()));
                    } else {
                        //if template is a template string
                        def.resolve(_this.compileTemplate(template));
                    }
                }
            }
            return def;
        },
        cacheTemplate:function(def, hash){
            templateIndex[hash] = def;
        },
        log:function(){
            console.log.apply(console,arguments);
        },
        getString:function(str){
            return str;
        },
        appModel: new Backbone.Model()
    }


    var getHash = function (key) {
        return hex_md5(key.toString());
    }

    var getTemplateDefByHash = function(hash){
        return templateIndex[hash];
    }


    return app;


})