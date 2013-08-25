define(['common/bone', 'common/list/singleSelect'], function (Bone, SingleSelect) {


    var setupFunctions = [setupMultiSelection];

    var Model = Bone.Model.extend({
        constructor: function (options) {
            var _this = this;
            Bone.Model.call(_this, options);
            _.each(setupFunctions, function(func){
                func.call(_this, options);
            })
        }
    })


    function setupMultiSelection() {

        var _this = this, selected = [];

        var coll = _this.get('items');



        _this.getSelected = function () {
            return selected;
        }

        _this.setSelectedById = function(id){
            var curItem = coll.get(id);
            curItem.toggleSelect();
            updateSelected();
        }

        _this.setSelected = function(curItem){
            curItem.toggleSelect();
            updateSelected();
        }

        var updateSelected = function(){
            selected = coll.where({selected: true});
            _this.set('selectedCount', selected.length);
        }

        updateSelected();
    }

    return {
        View:SingleSelect.View,
        Model:Model,
        ItemView:SingleSelect.ItemView,
        ItemCollection:SingleSelect.ItemCollection
    }

})