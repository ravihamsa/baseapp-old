define(['common/app', './view'],function(app, BaseView){

    var ItemView = BaseView.extend({
        tagName:'li',
        template:'{{name}}'
    });

    return ItemView;
});