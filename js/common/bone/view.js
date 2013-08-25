define(['common/app', 'common/bone/model'], function (app, BaseModel) {

    var BaseView = Backbone.View.extend({
        constructor: function (options) {
            var _this = this;
            Backbone.View.call(_this, options);
            _.each(setupFunctions, function(func){
                func.call(_this, options);
            })
        },
        render: function () {
            var _this = this;
            _this.beforeRender();
            app.getTemplateDef(_this.template).done(function(templateFunction){
                if(!_this.model){
                    _this.model = new BaseModel();
                }
                _this.renderTemplate(templateFunction);
                _this.postRender();
            });
            return _this;
        },
        postRender:function(){

        },
        beforeRender:function(){

        },
        renderTemplate:function(templateFunction){
            this.$el.html(templateFunction(this.model.toJSON()));
        },
        loadMeta:function(){
            if(!this.metaDef){
                var def = $.Deferred();
                this.metaDef = def.promise();
                def.resolve();
            }
            return this.metaDef;
        },
        getOption:function(option){
            return this.options[option];
        },
        actionHandler:function(){

        }
    });


    var bindDataEvents = function () {
        var _this = this;
        var modelOrCollection = _this.model || _this.collection;
        var eventList, _this;
        eventList = _this.dataEvents;
        _.each(eventList, function (handler, event) {
            var events, handlers, splitter;
            splitter = /\s+/;
            handlers = handler.split(splitter);
            events = event.split(splitter);
            _.each(handlers, function (shandler) {
                _.each(events, function (sevent) {
                    modelOrCollection.on(sevent, function () {
                        if (_this[shandler]) {
                            var args = Array.prototype.slice.call(arguments);
                            args.unshift(sevent);
                            _this[shandler].apply(_this, args);
                        } else {
                            throw shandler + ' Not Defined';
                        }
                    });
                });
            });
        });
    }

    var setupTemplateEvents = function () {
        (function(that){
            var template = that.template;

            if (template) {
                that.setTemplate = function (newTemplate) {
                    template = newTemplate;
                    that.render();
                }

                that.getTemplate = function () {
                    return template;
                }
            }
        })(this);
    }

    var setupStateEvents = function () {
        var _this = this;
        var state = _this.state;

    }

    var setupAttributeWatch = function(){
        var _this = this;
        var model = _this.model;
        if(model){
            model.on('change', _.bind(watchAttributes, _this));
        }
    }

    var watchAttributes = function (model) {
        var changes = model.changedAttributes();
        _.each(changes, function (value, attribute) {
            var handler = this[attribute + 'ChangeHandler'];
            if (handler && typeof handler === 'function') {
                handler.call(this, value);
            }
        }, this);

        var changeHandler = this.changeHandler;
        if(changeHandler && typeof changeHandler === 'function'){
            changeHandler.call(this, changes);
        }
    }

    var setupActionNavigateAnchors =  function(){
        var _this = this;
        _this.$el.on('click', '.action',function(e){
            e.preventDefault();
            var target = $(e.currentTarget);
            var action = target.attr('href').substr(1);
            _this['actionHandler'].call(_this, action);
        });
    }

    var setupFunctions = [bindDataEvents, setupTemplateEvents, setupStateEvents, setupAttributeWatch, setupActionNavigateAnchors];

    return BaseView;
});