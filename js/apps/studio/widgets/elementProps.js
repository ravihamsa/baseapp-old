define(['common/app', 'common/bone', 'common/widgets/form', 'common/list/singleSelect', 'text!../templates/widgets/elementProps.html', 'text!../templates/widgets/optionListElement.html'], function (app, Base, Form, SingleSelect, template, optionListTemplate) {
    var baseUtil = Base.util;

    var idCounter = 0;
    var getId = function(){
        return idCounter++;
    }

    var ElementPropertiesForm = Form.View.extend({
        template: '<div class="form-message-container"></div><form action="{{actionId}}" id="form-{{id}}" class="form-vertical" method=""><div class="grp-top"></div><div class="grp-elements"></div><div class="action-buttons"><a href="#delete" class="btn action">Delete</a> <a href="#duplicate" class="btn action">Duplicate</a> <a href="#moveup" class="btn action">Move Up</a> <a href="#movedown" class="btn action">Move Down</a> </div> </form>'
    })

    var OptionItemView = SingleSelect.ItemView.extend({
        template: '<div> <span class="type-checkbox"><input type="radio" name="selectedOption" {{#if selected}}checked="checked" {{/if}}  class="select-input"/></span> <input type="text" name="optionName" placeholder="Enter Option Name" value="{{name}}" class="name-input"/> {{#if isLast}} <a href="#add" class="action add btn icon"><em class="icon-plus-sign"></em> </a>{{else}} <a href="#remove" class="action remove btn icon"><em class="icon-minus-sign"></em> </a>{{/if}}  </div>',
        dataEvents:{
            'forceUpdateValue':'updateValue'
        },
        events:{
            'blur input':'updateValue'
        },
        actionHandler: function (action, e) {
            e.actionHandled = true;
            var coll = this.model.collection;
            switch (action) {
                case 'add':
                    this.updateValue();
                    this.model.collection.add({
                        id: getId(),
                        name: ''
                    })
                    break;
                case 'remove':
                    this.model.removeSelf();
                    break;
            }
        },
        updateValue:function(){
            var obj = {
                name:this.$('.name-input').val(),
                selected:this.$('.select-input').is(':checked')
            }
            this.model.set(obj, {silent:true});
        }
    })

    var OptionList = Form.ElementView.extend({
        template: optionListTemplate,
        postRender: function () {
            var value = this.model.get('value');
            if (_.isEmpty(value)) {
                value = [
                    {id: getId(), name:'', isLast:true}
                ]
            }
            var optionCollection = new SingleSelect.ItemCollection(value)
            var optionListModel = new SingleSelect.Model({
                items: optionCollection
            })

            var listView = baseUtil.createView({
                View: SingleSelect.View,
                ItemView: OptionItemView,
                model: optionListModel,
                parentEl: this.$('.options-list')
            })
            this.optionListModel = optionListModel;

            optionCollection.on('add',function(){
                var lastId = optionCollection.last().id;
                optionCollection.each(function(model){
                    if(model.id !== lastId){
                        model.set('isLast', false);
                    }else{
                        model.set('isLast', true);
                    }
                })

            })
        },
        valueChangeHandler: function (value) {
            var optionListModel = this.optionListModel;
            if (!optionListModel) {

            } else {
                var items = optionListModel.get('items');
                items.set(value);
            }
        },
        valueFunction: function () {
            var optionListModel = this.optionListModel;
            if (!optionListModel) {
                return this.model.get('value');
            } else {
                var items = optionListModel.get('items');
                items.each(function(model){
                    model.trigger('forceUpdateValue');
                });
                return items.toJSON();
            }
        }
    })

    var elementTypeList = [
        {
            id: 'label',
            name: 'Label'
        },
        {
            id: 'text',
            name: 'Single Line Text Field'
        },
        {
            id: 'number',
            name: 'Number'
        },
        {
            id: 'dropdown',
            name: 'Drop Down'
        }
    ]


    var View = Base.View.extend({
        template: template,
        changeHandler: function () {
            this.render();
        },
        postRender: function () {
            var elementModel = this.model.get('elementModel');
            if (!elementModel) {
                return;
            }
            this.renderForm(elementModel);

        },
        renderForm: function (elementModel) {
            var _this = this;
            var elementAttributes = elementModel.toJSON();

            var elementList = [];

            elementList.push({name: 'type', value: elementAttributes.type, type: 'select', options: elementTypeList, label: 'Field Type', group: 'top'});
            elementList.push({name: 'name', value: elementAttributes.name, label: 'Field Label'});

            switch (elementAttributes.type) {
                case 'dropdown':
                    elementList.push({name: 'defaultText', value: elementAttributes.defaultText})
                    elementList.push({name: 'required', type: 'checkbox', value: elementAttributes.required})
                    elementList.push({name: 'optionList', type: 'optionList', value: elementAttributes.optionList, label: 'Fields'})
                    elementList.push({name: 'multiSelect', type: 'checkbox', value: elementAttributes.multiSelect})
                    break;
                case 'text':
                    elementList.push({name: 'defaultText', value: elementAttributes.defaultText})
                    elementList.push({name: 'required', type: 'checkbox', value: elementAttributes.required})
                    break;
                case 'number':
                    elementList.push({name: 'defaultText', value: elementAttributes.defaultText})
                    elementList.push({name: 'required', type: 'checkbox', value: elementAttributes.required})
                    elementList.push({name: 'numberType', type: 'select', value: elementAttributes.numberType, options: [
                        {id: 'integer', name: 'Integer'},
                        {id: 'fraction', name: 'Fraction'}
                    ]})
                    elementList.push({name: 'decimal', type: 'select', value: elementAttributes.decimal, options: [
                        {id: 1, name: 1},
                        {id: 2, name: 2}
                    ]})
                    break;
            }

            elementList.push({name: 'visibility', type: 'select', value: elementAttributes.visibility, options: [
                {id: 'user', name: 'User'},
                {id: 'admin', name: 'Admin'},
                {id: 'manager', name: 'Manager'}
            ]})
            //elementList.push({name: 'update', type: 'submit', value: 'Update'})

            _.each(elementList, function (element) {
                if (!element.label) {
                    element.label = app.beautifyId(element.name);
                }

            })

            var coll = new Form.ElementCollection(elementList);

            var formModel = new Form.Model({
                elements: coll
            });

            var form = baseUtil.createView({
                View: ElementPropertiesForm,
                model: formModel,
                parentEl: this.$('.element-properties-form'),
                replaceHTML: true,
                skipRender: true
            })

            form.addToTypeViewIndex('optionList', OptionList);

            form.render();

            form.on('formSubmit', function (obj) {
               // elementModel.set(obj);
            })

            coll.on('all',function(){
                elementModel.set(form.model.getValueObject());
            });

            form.on('deleteElement', function () {
                _this.model.trigger('removeElement');
            });

            var fieldTypeModel = coll.get('type');

            fieldTypeModel.on('change:value', function (model, value) {
                elementModel.set('type', value);
            })
        },
        actionHandler: function (action, e) {
            e.actionHandled = true;
            var _this = this;
            var elementModel = this.model.get('elementModel');
            switch (action) {
                case 'delete':
                    _this.trigger('deleteElement', elementModel)
                    break;
                case 'moveup':
                    _this.trigger('moveUpElement', elementModel)
                    break;

                case 'movedown':
                    _this.trigger('moveDownElement', elementModel)
                    break;

                case 'duplicate':
                    _this.trigger('duplicateElement', elementModel)
                    break;

            }
        }


    })

    var Model = Base.Model.extend({

    });

    return {
        View: View,
        Model: Model
    }
})