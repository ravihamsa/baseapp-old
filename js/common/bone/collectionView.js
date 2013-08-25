define(['common/app', './view', './itemView'], function (app, BaseView, BaseItemView) {

    var CollectionView = BaseView.extend({
        tagName: 'ul',
        postRender: function () {
            var ItemView = this.getOption('itemView') || BaseItemView
            var fragment = document.createDocumentFragment();
            this.collection.each(function (model) {
                fragment.appendChild(new ItemView({model: model, className:model.id}).render().el)
            }, this)
            this.$el.append(fragment);
        },
        addItem: function (model, ItemView) {
            var view = new ItemView({model: model});
            view.render();
            this.$el.append(view.el);
        }
    });

    return CollectionView;
});