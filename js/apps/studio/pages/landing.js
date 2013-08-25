/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define([
    'common/bone',
    '../widgets/designTab',
    '../widgets/elementList',
    '../widgets/elementProps',
    '../widgets/formProps',
    'text!../templates/pages/landing.html'
], function (Base, DesignTab, ElementList, ElementProps, FormProps, template) {


    var PageView = Base.View.extend({
        template: template,
        postRender: function () {
            var designTab = Base.createView({View: DesignTab.View, Model: DesignTab.Model, parentEl: this.$('.design-tab')});
            var elementList = Base.createView({View: ElementList.View, Model: ElementList.Model, parentEl: this.$('.elements-tab')});
            var elementProps = Base.createView({View: ElementProps.View, Model: ElementProps.Model, parentEl: this.$('.properties-tab')});
            var formProps = Base.createView({View: FormProps.View, Model: FormProps.Model, parentEl: this.$('.properties-tab')});
        }
    })

    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})