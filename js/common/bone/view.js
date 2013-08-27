define(['common/app', 'common/bone/model', 'common/bone/util'], function (app, BaseModel, util) {

    var BaseView = Backbone.View.extend({
        constructor: function (options) {
            var _this = this;
            Backbone.View.call(_this, options);
            _.each(setupFunctions, function (func) {
                func.call(_this, options);
            })
        },
        render: function () {
            var _this = this;
            _this.beforeRender();
            app.getTemplateDef(_this.getTemplate()).done(function (templateFunction) {
                if (!_this.model) {
                    _this.model = new BaseModel();
                }
                _this.renderTemplate(templateFunction);
                setupSubViews.call(_this);
                if (_this.setState) {
                    var defaultState = _.keys(_this.getOption('states'))[0];
                    _this.setState(_this.getOption('state') || defaultState);
                }
                _this.postRender();
            });
            return _this;
        },
        postRender: function () {

        },
        beforeRender: function () {

        },
        renderTemplate: function (templateFunction) {
            this.$el.html(templateFunction(this.model.toJSON()));
        },
        loadMeta: function () {
            if (!this.metaDef) {
                var def = $.Deferred();
                this.metaDef = def.promise();
                def.resolve();
            }
            return this.metaDef;
        },
        getOption: function (option) {
            return this.options[option];
        },
        actionHandler: function () {

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

    var setupStateEvents = function () {
        var _this = this;
        var stateConfigs = _this.getOption('states');
        if (!stateConfigs) {
            return;
        }

        var state;
        var statedView;


        var cleanUpState = function () {
            if (statedView) {
                statedView.off();
                statedView.remove();
            }

        }

        var renderState = function (StateView) {
            statedView = util.createView({
                View: StateView,
                model: _this.model,
                parentEl: _this.$('.state-view')
            });
        }

        _this.setState = function (toState) {
            if (typeof toState === 'string') {
                if(state === toState){
                    return;
                }
                state = toState;
                var StateView = stateConfigs[toState];
                if (StateView) {
                    cleanUpState();
                    renderState(StateView);
                } else {
                    throw new Error('Invalid State')
                }

            } else {
                throw new Error('state should be a string')
            }
        }

        _this.getState = function () {
            return state;
        }

    }

    var setupTemplateEvents = function () {
        (function (that) {
            var template = that.getOption('template') || that.template;
            //if (template) {
            that.setTemplate = function (newTemplate) {
                template = newTemplate;
                that.render();
            }

            that.getTemplate = function () {
                return template;
            }
            //}
        })(this);
    }

    var setupSubViews = function () {
        var _this = this;
        var views = {};

        var subViewConfigs = _this.getOption('views');

        if(!subViewConfigs){
            return ;
        }

        _.each(subViewConfigs, function (viewConfig, viewName) {
            if (viewConfig.parentEl && typeof viewConfig.parentEl === 'string') {
                viewConfig.parentEl = _this.$(viewConfig.parentEl);
            }
            views[viewName] = util.createView(viewConfig);
        })

        _this.getSubView = function (id) {
            var subView = views[id]
            if (subView) {
                return subView;
            } else {
                throw new Error('No View Defined for id :' + id);
            }
        }

    }


    var setupAttributeWatch = function () {
        var _this = this;
        var model = _this.model;
        if (model) {
            model.on('change', _.bind(watchAttributes, _this));
            syncAttributes.call(_this, model)
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
        if (changeHandler && typeof changeHandler === 'function') {
            changeHandler.call(this, changes);
        }
    }

    var syncAttributes = function (model) {
        var changes = model.toJSON();
        _.each(changes, function (value, attribute) {
            var handler = this[attribute + 'ChangeHandler'];
            if (handler && typeof handler === 'function') {
                handler.call(this, value);
            }
        }, this);

        var changeHandler = this.changeHandler;
        if (changeHandler && typeof changeHandler === 'function') {
            changeHandler.call(this, changes);
        }
    }

    var setupActionNavigateAnchors = function () {
        var _this = this;
        _this.$el.on('click', '.action', function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            var action = target.attr('href').substr(1);
            _this['actionHandler'].call(_this, action);
        });
    }

    var setupOnChangeRender = function () {
        var _this = this;
        if (this.getOption('renderOnChange') === true) {
            _this.model.on('change', function () {
                _this.render.call(_this);
            })
        }
    }

    var setupFunctions = [bindDataEvents, setupTemplateEvents, setupAttributeWatch, setupActionNavigateAnchors, setupOnChangeRender, setupStateEvents];

    return BaseView;
});
