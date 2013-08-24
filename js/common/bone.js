define(function(require){

    return {
        View:require('./bone/view'),
        CollectionView:require('./bone/collectionView'),
        ItemView:require('./bone/itemView'),
        Model:require('./bone/model'),
        Collection:require('./bone/collection'),
        createView:function(Module, config){

            var view =  new Module.View({
                model:new Module.Model()
            });

            if(!config.skipRender){
                view.render();
            }

            if(config.parentEl){
                view.$el.appendTo(config.parentEl);
            }

            return view;

        }
    }

});