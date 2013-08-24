/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/bone', './examplePage'], function(Base, ExamplePage){


    var PageView = ExamplePage.View.extend({
        examples:[
            {
                func:autoWiredChangeListeners,
                title:'Auto wired Change Listeners'
            },{
                func:underscoreTemplate,
                title:'Underscore Template'
            },{
                func:urlTemplate,
                title:'URL Template'
            }
        ]
    })


    function autoWiredChangeListeners(previewEl){
        //


        var MyView = Base.View.extend({
            attribute1ChangeHandler:function(value){
                this.$el.html('attribute1 changed to : '+ value)
            }
        })
        var model = new Base.Model({
            attribute1:'value1',
            attribute2:'value2'
        })

        var view = new MyView({
            model:model
        })
        view.render();

        model.set('attribute1', new Date().toDateString());
        //

        previewEl.html(view.el);

    }


    function underscoreTemplate(previewEl){
        //
        var View = Base.View.extend({
            template: _.template('this is underscore template')
        });

        var view = new View();
        view.render();

        //

        previewEl.html(view.el);
    }

    function urlTemplate(previewEl){
        //
        var View = Base.View.extend({
            template: 'apps/examples/templates/urlTemplate.html'
        });

        var view = new View();
        view.render();

        //

        previewEl.html(view.el);
    }

    var PageModel = Base.Model.extend({

    });

    return {
        Model:PageModel,
        View:PageView
    }

})