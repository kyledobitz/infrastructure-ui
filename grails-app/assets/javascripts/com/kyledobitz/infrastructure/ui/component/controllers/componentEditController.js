//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.component")
    .controller("ComponentEditController", ComponentEditController);

function ComponentEditController(Component, $stateParams, $state, App) {
    var vm = this;

    vm.appList = App.list();

    Component.get({id: $stateParams.id}, function(data) {
        vm.component = new Component(data);
    }, function() {
        vm.errors = [{message: "Could not retrieve component with ID " + $stateParams.id}];
    });

    vm.updateComponent = function() {
        vm.errors = undefined;
        vm.component.$update(function() {
            $state.go('component.show', {id: vm.component.id});
        }, function(response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };
}
