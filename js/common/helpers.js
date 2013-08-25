define(['common/app'],function(app){

    Handlebars.registerHelper('elementLabel', function(element) {
        return element.name;
    });

    Handlebars.registerHelper('stringify', function(obj) {
        return JSON.stringify(obj)
    });

    Handlebars.registerHelper('toggleClass', function(attributeName, className) {
        if(this[attributeName]){
            return className || attributeName;
        }
    });


})