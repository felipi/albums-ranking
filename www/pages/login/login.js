var LoginStatus = (function () {
    function LoginStatus() {
    }
    return LoginStatus;
}());
LoginStatus.SUCCESS = "Login efetuado com sucesso";
LoginStatus.NO_USERNAME_PROVIDED = "Você deve preencher um nome de usuário!";
LoginStatus.NO_PASSWORD_PROVIDED = "Você deve preencher o campo de senha!";
var LoginController = (function () {
    function LoginController($scope, $rootScope, $localStorage, loginService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;
        this.loginService = loginService;
        this.$scope.loading = false;
        this.$scope.$ctrl = this;
        if (this.$localStorage.userSession !== undefined) {
            this.$rootScope.pageNavigator.pushPage('pages/dashboard/dashboard.html');
        }
    }
    LoginController.prototype.attemptLogin = function (username, password) {
        var _this = this;
        var promise = this.loginService.attemptLogin(username, password);
        promise.then(function (res) {
            var authkey = res.token;
            var session = new UserSession("1", username, authkey);
            console.log(session);
            _this.$rootScope.pageNavigator.pushPage('pages/dashboard/dashboard.html');
            _this.$localStorage.userSession = session;
        }, function (res) {
            console.log(res);
        });
    };
    return LoginController;
}());
LoginController.$inject = ['$scope', '$rootScope', '$localStorage', 'LoginService'];
var LoginService = (function () {
    function LoginService($timeout, $q, $http, $httpParamSerializer) {
        this.$timeout = $timeout;
        this.$q = $q;
        this.$http = $http;
        this.$httpParamSerializer = $httpParamSerializer;
    }
    LoginService.prototype.attemptLogin = function (username, password) {
        var defer = this.$q.defer();
        if (!username || username.length === 0 || username === '') {
            defer.reject(LoginStatus.NO_USERNAME_PROVIDED);
        }
        if (!password || password.length === 0 || password === '') {
            defer.reject(LoginStatus.NO_PASSWORD_PROVIDED);
        }
        var query = "authenticate";
        var data = {
            name: username,
            password: password
        };
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        this.$http.post("" + LOCAL_API + query, this.$httpParamSerializer(data), config).then(function (res) {
            defer.resolve(res);
        });
        return defer.promise;
    };
    return LoginService;
}());
LoginService.$inject = ['$timeout', '$q', '$http', '$httpParamSerializer'];
var UserSession = (function () {
    function UserSession(userId, username, authkey) {
        this.userId = userId;
        this.username = username;
        this.authKey = authkey;
    }
    UserSession.prototype.destroy = function () {
        this.userId = null;
        this.authKey = null;
        this.username = null;
    };
    return UserSession;
}());
//# sourceMappingURL=login.js.map