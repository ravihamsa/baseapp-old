define(['common/bone', 'common/list/singleSelect', 'text!../templates/widgets/formDesigner.html'], function(Base, SingleSelect, template){


    var ElementItemView = Base.View.extend({
        tagName:'li',
        template:'<a href="#{{id}}" class="action {{toggleClass "selected" "active"}}">{{name}} {{selected}}</a>'
    });

    var View =  SingleSelect.View.extend({
        template:template,
        postRender:function(){
            var items = this.model.get('items');
            var listView = Base.createCollectionView({
                View:Base.CollectionView,
                collection:items,
                parentEl:this.$('.selected-list'),
                itemView:SingleSelect.ItemView
            })
        },
        actionHandler:function(id){
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