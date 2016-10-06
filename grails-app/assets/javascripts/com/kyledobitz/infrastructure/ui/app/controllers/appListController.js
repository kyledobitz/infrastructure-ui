//= wrapped

angular
    .module("com.kyledobitz.infrastructure.ui.app")
    .controller("AppListController", AppListController);

function AppListController(App) {
    var vm = this;

    var max = 10, offset = 0;

    App.list({max: max, offset: offset}, function(data) {
        vm.appList = data;
    });
}
