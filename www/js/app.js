var API_URL = "http://ws.audioscrobbler.com/2.0/";
var API_ROUTE = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=Kchopa&limit=100&api_key=4ea6e00dd7c40c8c2e9f9b8727983b27&format=json";
var iTimeout = 600;
var uzzyeApp = ons.bootstrap('uzzyeApp', ['onsen', 'ngToast', 'ngStorage', 'ngResource', 'ui.bootstrap']);
var AppController = (function () {
    function AppController($scope) {
        this.$scope = $scope;
    }
    return AppController;
}());
uzzyeApp.controller('appController', AppController);
uzzyeApp.controller('menuController', MenuController);
uzzyeApp.controller('dashboardController', DashboardController);
uzzyeApp.service('AlbumsService', AlbumsService);
//# sourceMappingURL=app.js.map