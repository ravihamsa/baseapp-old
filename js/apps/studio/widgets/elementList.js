define(['common/bone', 'text!../templates/widgets/elementList.html'], function(Base, template){
    var View =  Base.View.extend({
        template:template
    })

    var Model = Base.Model.extend({

    });

    return {
        View:View,
        Model:Model
    }
})