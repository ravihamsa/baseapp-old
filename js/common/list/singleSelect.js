define(['common/bone'], function (Bone) {

    var baseUtil =  Bone.util;

    var View = Bone.View.extend({
        template:'<div class="list-view"></div>',
        postRender:function(){
            var items = this.model.get('items');
            var listView = baseUtil.createView({
                View:Bone.CollectionView,
                collection:items,
                parentEl:this.$('.list-view'),
                itemView:ItemView
            })
        },
        actionHandler:function(selectedId){
            this.model.setSelectedById(selectedId);
        }
    })

    var ItemModel = Bone.Model.extend({
        defaults:{
            selected:false
        },
        select:function(){
            this.set('selected', true);
        },
        deselect:function(){
            this.set('selected', false);
        },
        toggleSelect:function(){
            var selected = this.is('selected');
            this.set('selected', !selected);
        }
    })

    var ItemView = Bone.View.extend({
        tagName:'li',
        className:'single-select-item',
        template:'<a href="#{{id}}" class="action {{toggleClass "selected"}}">{{name}} {{selected}}</a>',
        changeHandler:function(){
            this.render();
        }
    })

    var ItemCollection = Bone.Collection.extend({
        model:ItemModel
    });


    var setupFunctions = [setupSingleSelection];

    var Model = Bone.Model.extend({
        constructor: function (options) {
            var _this = this;
            Bone.Model.call(_this, options);
            _.each(setupFunctions, function(func){
                func.call(_this, options);
            })
        }
    })

    function setupSingleSelection() {

        var _this = this, selected, previousSelected;

        var coll = _this.get('items');

        var selectedItem = coll.findWhere({selected: true});
        if (selectedItem) {
            selected = selectedItem;
            previousSelected = selectedItem;
        }

        var updateSelected = function(){
            _this.set('selectedItem', selected);
        }

        _this.getSelected = function () {
            return selected;
        }

        _this.prevSelected = function () {
            return previousSelected;
        }

        _this.setSelectedById = function(id){
            var curItem = coll.get(id);
            if(!selected){
                selected = curItem;
                curItem.select();
                updateSelected();
                return;
            }
            if(curItem.id === selected.id){
                return;
            }
            previousSelected = selected;
            selected =  curItem;
            previousSelected.deselect();
            curItem.select();
            updateSelected();
        }

        _this.setSelected = function(curItem){
            if(curItem.id === selected.id){
                return;
            }
            previousSelected = selected;
            selected =  curItem;
            previousSelected.deselect();
            curItem.select();
            updateSelected();
        }
    }

    return {
        View:View,
        Model:Model,
        ItemModel:ItemModel,
        ItemView:ItemView,
        ItemCollection:ItemCollection
    }

})