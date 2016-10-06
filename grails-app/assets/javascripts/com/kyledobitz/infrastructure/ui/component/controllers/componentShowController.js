//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.component")
    .controller("ComponentShowController", ComponentShowController);

function ComponentShowController(Component, $stateParams, $state) {
    var vm = this;

    Component.get({id: $stateParams.id}, function(data) {
        vm.component = new Component(data);
    }, function() {
        $state.go('component.list');
    });

    vm.delete = function() {
        vm.component.$delete(function() {
            $state.go('component.list');
        }, function() {
            //on error
        });
    };

}
