//= wrapped
//= require /angular/angular-resource

angular
    .module("com.kyledobitz.infrastructure.ui.app")
    .factory("App", App);

function App($resource) {
    var App = $resource(
        "app/:id",
        {"id": "@id"},
        {"update": {method: "PUT"},
         "query": {method: "GET", isArray: true},
         "get": {method: 'GET'}}
    );

    App.list = App.query;

    App.prototype.toString = function() {
        return 'com.kyledobitz.infrastructure.ui.App : ' + (this.id ? this.id : '(unsaved)');
    };

    return App;
}
