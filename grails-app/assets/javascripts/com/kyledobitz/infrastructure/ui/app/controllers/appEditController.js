//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.app")
    .controller("AppEditController", AppEditController);

function AppEditController(App, $stateParams, $state) {
    var vm = this;

    

    App.get({id: $stateParams.id}, function(data) {
        vm.app = new App(data);
    }, function() {
        vm.errors = [{message: "Could not retrieve app with ID " + $stateParams.id}];
    });

    vm.updateApp = function() {
        vm.errors = undefined;
        vm.app.$update(function() {
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
