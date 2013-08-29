define(['common/app','common/bone', 'common/widgets/form', 'text!../templates/widgets/elementProps.html'], function (app, Base, Form, template) {
    var baseUtil = Base.util;


    var ElementPropertiesForm = Form.View.extend({
        template: '<div class="form-message-container"></div><form action="{{actionId}}" id="form-{{id}}" class="form-vertical" method=""><div class="grp-top"></div><div class="grp-elements"></div><div class="action-buttons"><a href="#delete" class="btn action">Delete</a> <a href="#duplicate" class="btn action">Duplicate</a> <a href="#moveup" class="btn action">Move Up</a> <a href="#movedown" class="btn action">Move Down</a> </div> </form>'
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
        renderForm:function(elementModel){
            var _this = this;
            var elementAttributes = elementModel.toJSON();

            var elementList = [];

            elementList.push({name: 'type', value:elementAttributes.type, type:'select', options:elementTypeList, label:'Field Type', group:'top'});
            elementList.push({name: 'name', value:elementAttributes.name, label:'Field Label'});

            switch (elementAttributes.type) {
                case 'label':


                    break;

                case 'text':
                    elementList.push({name: 'defaultText', value:elementAttributes.defaultText})
                    elementList.push({name: 'required', type:'checkbox', value:elementAttributes.required})
                    break;
                case 'number':
                    elementList.push({name: 'defaultText', value:elementAttributes.defaultText})
                    elementList.push({name: 'required', type:'checkbox', value:elementAttributes.required})
                    elementList.push({name: 'numberType', type:'select', value:elementAttributes.numberType, options:[{id:'integer', name:'Integer'}, {id:'fraction', name:'Fraction'}]})
                    elementList.push({name: 'decimal', type:'select', value:elementAttributes.decimal, options:[{id:1, name:1}, {id:2, name:2}]})
                    break;
            }

            elementList.push({name:'visibility', type:'select', value:elementAttributes.visibility, options:[{id:'user', name:'User'}, {id:'admin', name:'Admin'}, {id:'manager', name:'Manager'}]})
            elementList.push({name:'update', type:'submit', value:'Update'})

            _.each(elementList,function(element){
                if(!element.label){
                    element.label = app.beautifyId(element.name);
                }

            })

            var coll =  new Form.ElementCollection(elementList);

            var formModel = new Form.Model({
                elements: coll
            });

            var form = baseUtil.createView({
                View:ElementPropertiesForm,
                model:formModel,
                parentEl:this.$('.element-properties-form'),
                replaceHTML:true
            })

            form.on('formSubmit', function(obj){
                elementModel.set(obj);
            })

            form.on('deleteElement',function(){
                _this.model.trigger('removeElement');
            });

            var fieldTypeModel =  coll.get('type');

            fieldTypeModel.on('change:value',function(model, value){
                elementModel.set('type', value);
            })
        },
        actionHandler:function(action, e){
            e.actionHandled = true;
            var _this = this;
            var elementModel = this.model.get('elementModel');
            switch(action){
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