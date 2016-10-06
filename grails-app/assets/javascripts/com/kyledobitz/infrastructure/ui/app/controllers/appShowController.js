//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.app")
    .controller("AppShowController", AppShowController);

function AppShowController(App, $stateParams, $state) {
    var vm = this;

    App.get({id: $stateParams.id}, function(data) {
        vm.app = new App(data);
    }, function() {
        $state.go('app.list');
    });

    vm.delete = function() {
        vm.app.$delete(function() {
            $state.go('app.list');
        }, function() {
            //on error
        });
    };

}
