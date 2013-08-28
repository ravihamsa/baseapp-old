define(function(){
    "use strict";

    var util = {};

    util.paramsToObject = function(params){
        if(!params){
            return  {};
        }
        var paramsArray = _.map(params.split(';'),function(str){return str.split('=');});
        var obj = {};
        _.each(paramsArray,function(arr){
            obj[arr[0]]=arr[1];
        });
        return obj;
    };
    util.objectToParams = function(obj){
        var str = [];

        _.each(obj, function(value, index){
            str.push(index+'='+value);
        });

        return str.join(';');
    }


    return util;
})