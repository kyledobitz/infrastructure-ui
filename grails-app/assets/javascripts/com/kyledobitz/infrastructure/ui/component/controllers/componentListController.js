//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.component")
    .controller("ComponentListController", ComponentListController);

function ComponentListController(Component) {
    var vm = this;

    var max = 10, offset = 0;

    Component.list({max: max, offset: offset}, function(data) {
        vm.componentList = data;
    });
}
