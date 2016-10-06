//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.component")
    .controller("ComponentCreateController", ComponentCreateController);

function ComponentCreateController(Component, $state, App) {

    var vm = this;
    vm.appList = App.list();
    vm.component = new Component();
    
    vm.saveComponent = function() {
        vm.errors = undefined;
        vm.component.$save({}, function() {
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
