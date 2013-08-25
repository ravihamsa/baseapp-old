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
    'text!../templates/pages/landing.html'
], function (Base, Tab, SingleSelect, ElementList, ElementProps, FormProps, template) {


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

            var tabModel = new Tab.Model({
                items: new SingleSelect.ItemCollection(tabList)
            })
            var tab = Base.createView({View: Tab.View, model: tabModel, el: this.$('.design-tab')});

            var elementList = Base.createView({View: ElementList.View, Model: ElementList.Model, parentEl: tab.$('.tab-list .addFields')});
            var elementProps = Base.createView({View: ElementProps.View, Model: ElementProps.Model, parentEl: tab.$('.tab-list .fldProperties')});
            var formProps = Base.createView({View: FormProps.View, Model: FormProps.Model, parentEl: tab.$('tab-list .formSettings')});

        }
    })

    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})