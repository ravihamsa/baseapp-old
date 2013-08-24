/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/bone', '../widgets/designTab','text!../templates/pages/landing.html'], function(Base, DesignTab, template){


    var PageView = Base.View.extend({
        template:template,
        postRender:function(){
            var designTab = new DesignTab.View({
                model:new DesignTab.Model()
            })

            designTab.render();
            this.$('.design-tab').append(designTab.el);

        }
    })

    var PageModel = Base.Model.extend({

    });

    return {
        Model:PageModel,
        View:PageView
    }

})