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
                func:inlineTemplate,
                title:'Inline Template'
            },{
                func:underscoreTemplate,
                title:'Underscore Template'
            },{
                func:urlTemplate,
                title:'URL Template'
            },
            {
                func:autoWiredChangeListeners,
                title:'Auto wired model change listeners',
                desc:'Methods of view defined in pattern [attributeName]ChangeHandler will get called every time attribute is changed. No need of add listeners for the same'
            },
            {
                func:dataEvents,
                title:'DataEvents',
                desc:'Use events like hash to listen for events for model / collection defined in view'
            }
        ]
    })


    function inlineTemplate(previewEl){
        //
        var View = Base.View.extend({
            template:'this is inline template'
        });

        var view = new View();
        view.render();

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

    function autoWiredChangeListeners(previewEl){
        //


        var MyView = Base.View.extend({
            template:'<div> <button class="btn but1 btn-primary">Change Attribute 1</button> <button class="btn but2 btn-primary">Change Attribute 2</button> </div> <pre class="output"></pre> ',
            events:{
                'click .but1':'but1ClickHandler',
                'click .but2':'but2ClickHandler'
            },
            but1ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute1',new Date().toTimeString());
            },
            but2ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute2',new Date().toTimeString());
            },
            attribute1ChangeHandler:function(value){
                this.printOutJSON();
            },
            attribute2ChangeHandler:function(value){
                this.printOutJSON();
            },
            printOutJSON:function(){
                this.$('.output').html(syntaxHighlight(this.model.toJSON()));
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
        view.printOutJSON();
        //

        previewEl.html(view.el);

    }


    function dataEvents(previewEl){
        //


        var MyView = Base.View.extend({
            template:'<div> <button class="btn but1 btn-primary">Change Attribute 1</button> <button class="btn but2 btn-primary">Change Attribute 2</button> </div> <pre class="output"></pre> ',
            events:{
                'click .but1':'but1ClickHandler',
                'click .but2':'but2ClickHandler'
            },
            dataEvents:{
                'change:attribute1 change:attribute2':'printOutJSON'
            },
            but1ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute1',new Date().toTimeString());
            },
            but2ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute2',new Date().toTimeString());
            },
            printOutJSON:function(){
                this.$('.output').html(syntaxHighlight(this.model.toJSON()));
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
        view.printOutJSON();
        //

        previewEl.html(view.el);

    }

    var PageModel = Base.Model.extend({

    });

    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    return {
        Model:PageModel,
        View:PageView
    }

})