define(function(){

    return {
        createView: function (config) {

            var view;
            var viewTye = 'model';

            if(config.collection || config.Collection){
                viewTye = 'collection'
            }


            if(viewTye === 'model'){
                if(config.Model){
                    config.model = new config.Model(config.attributes);
                }
            }else{
                if(config.Collection){
                    config.collection = new config.Collection(config.items);
                }
            }

            var filteredConfig = _.omit(config, 'Collection','Model', 'parentEl', 'skipRender')
            view = new config.View(filteredConfig)

            if(view){
                //skip render if skipRender is true
                if (!config.skipRender) {
                    view.render();
                }

                //if parentEl
                if (config.parentEl) {
                    if(config.replaceHTML){
                        config.parentEl.empty();
                    }
                    view.$el.appendTo(config.parentEl);
                }
            }

            return view;
        }
    }

});