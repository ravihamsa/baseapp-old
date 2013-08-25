define([
    'common/app',
    'common/bone',
    'common/list/singleSelect'
    ],
    function(app, Base, SingleSelect){

        var NavItemView = Base.View.extend({
            tagName:'li',
            template:'<a href="#{{id}}" class="action">{{name}}</a>',
            changeHandler:function(){
                this.$el.toggleClass('active',this.model.is('selected'));
            }
        })

        var TabItemView = Base.View.extend({
            template:'{{name}}',
            changeHandler:function(){
                this.$el.toggle(this.model.is('selected'));
            }
        })

        var View = SingleSelect.View.extend({
            template:'<ul class="inline-block-list"></ul><div class="tab-list p10"></div> ',
            postRender:function(){
                var items = this.model.get('items');
                var navListView = Base.createCollectionView({
                    View:Base.CollectionView,
                    collection:items,
                    el:this.$('.inline-block-list'),
                    itemView:NavItemView
                })

                var tabListView = Base.createCollectionView({
                    View:Base.CollectionView,
                    tagName:'div',
                    collection:items,
                    el:this.$('.tab-list'),
                    itemView:TabItemView
                })
            },
            actionHandler:function(selectedId){
                this.model.setSelectedById(selectedId);
            }
        })


        return {
            View:View,
            Model:SingleSelect.Model
        }

    });