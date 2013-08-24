define(['common/app'],function(app){

    Handlebars.registerHelper('elementLabel', function(element) {
        return element.name;
    });

    Handlebars.registerHelper('stringify', function(obj) {
        return JSON.stringify(obj)
    });
})