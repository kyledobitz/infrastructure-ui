//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /com/kyledobitz/infrastructure/ui/core/com.kyledobitz.infrastructure.ui.core
//= require /com/kyledobitz/infrastructure/ui/app/com.kyledobitz.infrastructure.ui.app
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("com.kyledobitz.infrastructure.ui.component", [
    "ui.router",
    "ngResource",
    "com.kyledobitz.infrastructure.ui.core",
    "com.kyledobitz.infrastructure.ui.app"
]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('component', {
            url: "/component",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('component.list', {
            url: "",
            templateUrl: "/com/kyledobitz/infrastructure/ui/component/list.html",
            controller: "ComponentListController as vm"
        })
        .state('component.create', {
            url: "/create",
            templateUrl: "/com/kyledobitz/infrastructure/ui/component/create.html",
            controller: "ComponentCreateController as vm"
        })
        .state('component.edit', {
            url: "/edit/:id",
            templateUrl: "/com/kyledobitz/infrastructure/ui/component/edit.html",
            controller: "ComponentEditController as vm"
        })
        .state('component.show', {
            url: "/show/:id",
            templateUrl: "/com/kyledobitz/infrastructure/ui/component/show.html",
            controller: "ComponentShowController as vm"
        });
}
