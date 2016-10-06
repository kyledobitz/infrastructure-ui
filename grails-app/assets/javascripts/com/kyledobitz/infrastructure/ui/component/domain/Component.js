//= wrapped
//= require /angular/angular-resource

angular
    .module("com.kyledobitz.infrastructure.ui.component")
    .factory("Component", Component);

function Component($resource, domainListConversion, domainConversion) {
    var Component = $resource(
        "component/:id",
        {"id": "@id"},
        {"update": {method: "PUT"},
         "query": {method: "GET", isArray: true, transformResponse: [angular.fromJson, domainListConversion("App", "app", "domainConversion")]},
         "get": {method: 'GET', transformResponse: [angular.fromJson, domainConversion("App", "app")]}}
    );

    Component.list = Component.query;

    Component.prototype.toString = function() {
        return 'com.kyledobitz.infrastructure.ui.Component : ' + (this.id ? this.id : '(unsaved)');
    };

    return Component;
}
