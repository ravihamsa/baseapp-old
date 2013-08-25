define(['common/app', './view', './itemView'], function (app, BaseView, BaseItemView) {

    var CollectionView = BaseView.extend({
        tagName: 'ul',
        dataEvents:{
            'add' : 'addHandler'
        },
        postRender: function () {
            var ItemView = this.getOption('itemView') || BaseItemView
            var fragment = document.createDocumentFragment();
            this.collection.each(function (model) {
                fragment.appendChild(new ItemView({model: model, className:'id-'+model.id}).render().el)
            }, this)
            this.$el.append(fragment);
        },
        addItem: function (model, ItemView) {
            var view = new ItemView({model: model});
            view.render();
            this.$el.append(view.el);
        },
        addHandler:function(event, model){
            var ItemView = this.getOption('itemView') || BaseItemView
            this.addItem(model, ItemView);
        }
    });

    return CollectionView;
});