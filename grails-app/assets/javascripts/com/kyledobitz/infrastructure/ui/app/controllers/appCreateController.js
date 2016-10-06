//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.app")
    .controller("AppCreateController", AppCreateController);

function AppCreateController(App, $state) {

    var vm = this;
    
    vm.app = new App();
    
    vm.saveApp = function() {
        vm.errors = undefined;
        vm.app.$save({}, function() {
            $state.go('app.show', {id: vm.app.id});
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
