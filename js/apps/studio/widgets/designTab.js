define(['common/bone', 'text!../templates/widgets/designTab.html'], function(Base, template){
    var View =  Base.View.extend({
        template:template,
        selectedTabChangeHandler:function(value){
            this.$('.active').removeClass('active');
            this.$('.'+value).addClass('active');
        },
        actionHandler:function(action){
            this.model.set('selectedTab', action);
        }
    })

    var Model = Base.Model.extend({
        defaults:{
            selectedTab:'element-list'
        }
    });

    return {
        View:View,
        Model:Model
    }
})