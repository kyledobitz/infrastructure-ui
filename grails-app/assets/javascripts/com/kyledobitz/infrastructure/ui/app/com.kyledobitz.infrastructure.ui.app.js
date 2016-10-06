//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /com/kyledobitz/infrastructure/ui/core/com.kyledobitz.infrastructure.ui.core
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("com.kyledobitz.infrastructure.ui.app", ["ui.router", "ngResource", "com.kyledobitz.infrastructure.ui.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('app.list', {
            url: "",
            templateUrl: "/com/kyledobitz/infrastructure/ui/app/list.html",
            controller: "AppListController as vm"
        })
        .state('app.create', {
            url: "/create",
            templateUrl: "/com/kyledobitz/infrastructure/ui/app/create.html",
            controller: "AppCreateController as vm"
        })
        .state('app.edit', {
            url: "/edit/:id",
            templateUrl: "/com/kyledobitz/infrastructure/ui/app/edit.html",
            controller: "AppEditController as vm"
        })
        .state('app.show', {
            url: "/show/:id",
            templateUrl: "/com/kyledobitz/infrastructure/ui/app/show.html",
            controller: "AppShowController as vm"
        });
}
