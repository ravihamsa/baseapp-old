define(['common/bone', 'text!../templates/widgets/header.html'],function(Bone, template){

    var HeaderView = Bone.View.extend({
        template:template,
        appIdChangeHandler:function(value){
            this.$('.active').removeClass('active');
            this.$('.'+value).addClass('active');
        }
    });

    return {
        View:HeaderView,
        Model:Bone.Model
    };
})