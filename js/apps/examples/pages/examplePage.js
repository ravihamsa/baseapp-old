/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/app','common/bone','text!../templates/pages/examplePage.html'], function(app,Base, template){

    var exampleTemplateFunction = app.compileTemplate('<div id="{{func.name}}"> <h1>{{title}}</h1><p>{{desc}}</p><p style="text-align: right"><a href="#top" class="exampleLink">Top</a> </p><div class="bs-docs-code"><pre></pre></div><div class="preview bs-docs-demo"></div> </div>');

    var PageView = Base.View.extend({
        template:template,
        events:{
            'click .exampleLink':'scrollToExample'
        },
        postRender:function(){
            var _this = this;
            var examples =  this.examples;

            var listEl = $('<ul class="nav nav-list"></ul>');
            var codeEl = $('<div></div>');
            this.$el.append(listEl);
            this.$el.append(codeEl);
            _.each(examples, function (example) {
                var func = example.func;


                var functionString = func.toString();
                var exampleName = func.name;
                var startIndex = functionString.indexOf('//') - 8;
                var lastIndex = functionString.lastIndexOf('//')
                listEl.append('<li><a class="exampleLink" href="#'+exampleName+'">'+example.title+' </a> </li>');
                codeEl.append(exampleTemplateFunction(example));
                var preEl = _this.$('#' + exampleName + ' pre');
                var previewEl = _this.$('#' + exampleName + ' .preview');
                preEl.addClass('prettyprint');
                preEl.addClass('lang-js');
                //preEl.addClass('linenums');
                preEl.html(Handlebars.Utils.escapeExpression(functionString.substr(startIndex, lastIndex - startIndex)));
                func.call(_this, previewEl);
            })
        },
        scrollToExample:function(e){
            e.preventDefault();
            var target = $(e.target);
            var exampleId =  target.attr('href');
            $('html, body').animate({
                scrollTop: this.$(exampleId).offset().top + 'px'
            }, 'slow');
        }
    })

    var PageModel = Base.Model.extend({

    });

    return {
        Model:PageModel,
        View:PageView
    }

})