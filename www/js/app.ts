///* DEV
var API_URL = "http://ws.audioscrobbler.com/2.0/";
var API_ROUTE = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=Kchopa&limit=100&api_key=4ea6e00dd7c40c8c2e9f9b8727983b27&format=json";

var LOCAL_API = "http://localhost:8080/api/";
//*/
var iTimeout = 600; // TEMPO UM POUCO ACIMA DAS TRANSIÇÕES
var uzzyeApp = ons.bootstrap('uzzyeApp',['onsen', 'ngToast', 'ngStorage', 'ngResource', 'ui.bootstrap']);

class AppController {
    
    constructor(
        private $scope: ng.IScope
    )  {}
}

uzzyeApp.controller('appController', AppController);
uzzyeApp.controller('menuController', MenuController);

uzzyeApp.controller('dashboardController', DashboardController);
uzzyeApp.service('AlbumsService', AlbumsService);

uzzyeApp.controller('loginController', LoginController);
uzzyeApp.service('LoginService', LoginService);
