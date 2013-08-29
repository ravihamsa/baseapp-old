define(['common/app', './model'],function(app, BaseModel){

    var BaseCollection = Backbone.Collection.extend({
        model:BaseModel
    });

    return BaseCollection;
});