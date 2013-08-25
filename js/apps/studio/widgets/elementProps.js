define(['common/bone', 'common/widgets/form', 'text!../templates/widgets/elementProps.html'], function (Base, Form, template) {
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

            var elementAttributes = elementModel.toJSON();

            var elementList = [];

            switch (elementAttributes.type) {
                case 'label':
                    elementList.push({name: 'name', value: elementAttributes.name});
                    elementList.push({name: 'fieldLabel', value:elementAttributes.fieldLabel});

                    break;

                case 'text':
                    elementList.push({name: 'name', value: elementAttributes.name})
                    elementList.push({name: 'defaultText', value:elementAttributes.defaultText})
                    elementList.push({name: 'required', type:'checkbox', value:elementAttributes.required})
                    break;
                case 'number':
                    elementList.push({name: 'name', value: elementAttributes.name})
                    elementList.push({name: 'defaultText', value:elementAttributes.defaultText})
                    elementList.push({name: 'required', type:'checkbox', value:elementAttributes.required})
                    elementList.push({name: 'numberType', type:'select', value:elementAttributes.numberType, options:[{id:'integer', name:'Integer'}, {id:'fraction', name:'Fraction'}]})
                    elementList.push({name: 'decimal', type:'select', value:elementAttributes.decimal, options:[{id:1, name:1}, {id:2, name:2}]})
                    break;
            }

            elementList.push({name:'visibility', type:'select', value:elementAttributes.visibility, options:[{id:'user', name:'User'}, {id:'admin', name:'Admin'}, {id:'manager', name:'Manager'}]})
            elementList.push({name:'update', type:'submit', value:'Update'})

            var coll =  new Form.ElementCollection(elementList);
            var formModel = new Form.Model({
                elements: coll
            });

            var form = Base.createView({
                View:Form.View,
                model:formModel,
                parentEl:this.$('.form-container'),
                replaceHTML:true
            })

            form.on('formSubmit', function(obj){
                elementModel.set(obj);
                console.log(elementModel.toJSON())
            })

        }


    })

    var Model = Base.Model.extend({

    });

    return {
        View: View,
        Model: Model
    }
})