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

    var baseUtil =  Base.util;

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
                    id: 'dropdown',
                    name: 'Drop Down'
                }
            ]


            var tabModel = new Tab.Model({
                items: new SingleSelect.ItemCollection(tabList)
            })
            var tab = baseUtil.createView({View: Tab.View, model: tabModel, el: this.$('.prop-stack')});

            var elementCollection = new SingleSelect.ItemCollection(elementTypeList)
            var elementListModel = new ElementList.Model({
                items: elementCollection
            })

            var elementList = baseUtil.createView({View: ElementList.View, model:elementListModel, parentEl: tab.$('.tab-panes .id-addFields')});
            var elementProps = baseUtil.createView({View: ElementProps.View, Model: ElementProps.Model, parentEl: tab.$('.tab-panes .id-fldProperties')});
            var formProps = baseUtil.createView({View: FormProps.View, Model: FormProps.Model, parentEl: tab.$('.tab-panes .id-formSettings')});


            var elementPropsModel = elementProps.model;



            var formElementsCollection = new SingleSelect.ItemCollection()
            var formDesignerModel = new FormDesigner.Model({
                items:formElementsCollection
            });

            var formDesigner = baseUtil.createView({View: FormDesigner.View, model: formDesignerModel, parentEl: this.$('.sel-el-list')});

            var counter = 0;
            elementCollection.on('elementDropped',function(model){
                var data =  model.toJSON();
                var obj = {
                    id:''+counter++,
                    name:'Field Label '+counter,
                    type:data.id
                }
                formElementsCollection.add(obj);
                formDesignerModel.setSelectedById(obj.id);

            });


            formDesignerModel.on('change:selectedItem',function(model, selectedModel){
                elementPropsModel.set('elementModel',selectedModel);
                tabModel.setSelectedById('fldProperties');
            })

            formElementsCollection.on('change:type',function(model, value){
                elementPropsModel.set('elementModel',model);
                elementProps.render();
            });


            //
            elementProps.on('deleteElement',function(model){
                var closestModel = model.getClosest();
                model.removeSelf();
                if(closestModel){
                    formDesignerModel.setSelectedById(closestModel.id);
                }else{
                    formDesignerModel.clearSelection();
                }

            })

            elementProps.on('duplicateElement',function(model){
                var obj =  model.toJSON();
                obj.id = ''+counter++
                obj.name = obj.name + ' Copy'
                formElementsCollection.add(obj);
                formDesignerModel.setSelectedById(obj.id);
            })

            elementProps.on('moveUpElement',function(model){
                model.moveUp();
            })
            elementProps.on('moveDownElement',function(model){
                model.moveDown();
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