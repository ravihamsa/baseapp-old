define(['common/app', './view', './itemView', './util'], function (app, BaseView, BaseItemView, util) {



    var CollectionView = BaseView.extend({
        tagName: 'ul',
        dataEvents:{
            'add' : 'addHandler',
            'remove':'removeHandler'
        },
        postRender: function () {
            collectionRender.call(this);
        },
        addHandler:function(event, model){
            this.addItem(model)
        },
        removeHandler:function(event,model){
            this.removeItem(model)
        }
    });

    var collectionRender = function(){
        var _this = this;
        var viewArray = {};
        var el = this.$el;
        var coll = this.collection;

        _this.addItem = function(model, containerEl){
            if(!containerEl){
                containerEl = el;
            }
            var index = coll.indexOf(model);

            var ItemView = _this.getOption('itemView') || BaseItemView;
            var view = util.createView({model: model, className:'id-'+model.id, View:ItemView});
            viewArray[model.id] = view;

            var index = coll.indexOf(model);
            if(index=== 0){
                view.$el.prependTo(containerEl);
            }else if(index >= coll.length -1){
                view.$el.appendTo(containerEl);
            }else{
                var beforeView = _this.getModelViewAt(coll.at(index-1).id);
                view.$el.insertAfter(beforeView.$el)
            }

        }

        _this.removeItem = function(model){
            var view = _this.getModelViewAt(model.id);
            view.remove();
        }

        _this.getModelViewAt =function(id){
            return viewArray[id];
        }

        var fragment = document.createDocumentFragment();
        coll.each(function (model, index) {
            _this.addItem(model, fragment);
        });
        this.$el.append(fragment);
    }

    return CollectionView;
});
