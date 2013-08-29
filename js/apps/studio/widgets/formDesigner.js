define(['common/bone', 'common/list/singleSelect', 'text!../templates/widgets/formDesigner.html'], function(Base, SingleSelect, template){

    var baseUtil = Base.util;

    var View =  SingleSelect.View.extend({
        template:template,
        postRender:function(){
            var items = this.model.get('items');
            var listView = baseUtil.createView({
                View:Base.CollectionView,
                collection:items,
                parentEl:this.$('.selected-list'),
                itemView:SingleSelect.ItemView
            })
        },
        actionHandler:function(id, e){
            e.actionHandled = true;
            this.model.setSelectedById(id);
        }
    })

    var Model = SingleSelect.Model.extend({

    });

    return {
        View:View,
        Model:Model
    }
})