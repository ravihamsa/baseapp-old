define(['common/app'],function(app){

    var BaseModel = Backbone.Model.extend({
        is:function(attribute){
            return this.get(attribute) === true;
        },
        isNot:function(attribute){
            return this.get(attribute) === false;
        },
        isEqual:function(attribute, value){
            return this.get(attribute) === value;
        },
        isNotEqual:function(attribute, value){
            return this.get(attribute) !== value;
        },
        removeSelf:function(){
            if(this.collection){
                this.collection.remove(this);
            }
        }
    });

    return BaseModel;
});