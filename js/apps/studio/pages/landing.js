/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define([
    'common/bone',
    'common/widgets/tab',
    'common/list/singleSelect',
    '../widgets/elementList',
    '../widgets/elementProps',
    '../widgets/formProps',
    '../widgets/formDesigner',
    'text!../templates/pages/landing.html'
], function (Base, Tab, SingleSelect, ElementList, ElementProps, FormProps, FormDesigner,  template) {


    var PageView = Base.View.extend({
        template: template,
        postRender: function () {
            var tabList = [
                {
                    id:'addFields',
                    name:'Add Fields',
                    selected:true
                },
                {
                    id:'fldProperties',
                    name:'Field Properties'
                },
                {
                    id:'formSettings',
                    name:'Form Settings'
                }
            ]

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
                    id: 'email',
                    name: 'Email'
                },
                {
                    id: 'dropdown',
                    name: 'Drop Down'
                }
            ]


            var tabModel = new Tab.Model({
                items: new SingleSelect.ItemCollection(tabList)
            })
            var tab = Base.createView({View: Tab.View, model: tabModel, el: this.$('.design-tab')});

            var elementCollection = new SingleSelect.ItemCollection(elementTypeList)
            var elementListModel = new ElementList.Model({
                items: elementCollection
            })

            var elementList = Base.createView({View: ElementList.View, model:elementListModel, parentEl: tab.$('.tab-list .id-addFields')});
            var elementProps = Base.createView({View: ElementProps.View, Model: ElementProps.Model, parentEl: tab.$('.tab-list .id-fldProperties')});
            var formProps = Base.createView({View: FormProps.View, Model: FormProps.Model, parentEl: tab.$('.tab-list .id-formSettings')});




            var formElementsCollection = new SingleSelect.ItemCollection()
            var formDesignerModel = new FormDesigner.Model({
                items:formElementsCollection
            });

            var formDesigner = Base.createView({View: FormDesigner.View, model: formDesignerModel, parentEl: this.$('.form-element-list')});

            var counter = 0;
            elementCollection.on('elementDropped',function(data){
                var obj = {
                    id:''+counter++,
                    name:data.name+' '+counter,
                    type:data.id
                }
                formElementsCollection.add(obj);

            });


            formDesignerModel.on('change:selectedItem',function(model, selectedModel){
                elementProps.model.set(selectedModel.toJSON());
                tabModel.setSelectedById('fldProperties');
            })

        }
    })

    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})