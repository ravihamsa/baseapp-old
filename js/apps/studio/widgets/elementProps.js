define(['common/bone', 'text!../templates/widgets/elementProps.html'], function(Base, template){
    var View =  Base.View.extend({
        template:template,
        changeHandler:function(){
            this.render();
        }

    })

    var Model = Base.Model.extend({

    });

    return {
        View:View,
        Model:Model
    }
})