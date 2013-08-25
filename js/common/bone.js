define(function (require) {

    return {
        View: require('./bone/view'),
        CollectionView: require('./bone/collectionView'),
        ItemView: require('./bone/itemView'),
        Model: require('./bone/model'),
        Collection: require('./bone/collection'),
        createView: function (config) {

            var view;

            if(config.Model){
                config.model = new config.Model(config.attributes);
            }

            var filteredConfig = _.omit(config, 'Model', 'parentEl', 'skipRender')

            view = new config.View(filteredConfig)

            if(view){
                //skip render if skipRender is true
                if (!config.skipRender) {
                    view.render();
                }

                //if parentEl
                if (config.parentEl) {
                    view.$el.appendTo(config.parentEl);
                }
            }

            return view;
        },
        createCollectionView: function (config) {
            var view;
            if(config.Collection){
                config.collection = new config.Collection(config.items);
            }

            var filteredConfig = _.omit(config, 'Collection', 'parentEl', 'skipRender')

            view = new config.View(filteredConfig)

            if(view){
                //skip render if skipRender is true
                if (!config.skipRender) {
                    view.render();
                }

                //if parentEl
                if (config.parentEl) {
                    view.$el.appendTo(config.parentEl);
                }
            }

            return view;

        }
    }

});