interface ILoginScope extends ng.IScope {
    username: string;
    password: string;
    loading: boolean;
    $ctrl: LoginController;
}

class LoginStatus {
    public static SUCCESS: string = "Login efetuado com sucesso";
    public static NO_USERNAME_PROVIDED: string = "Você deve preencher um nome de usuário!";
    public static NO_PASSWORD_PROVIDED: string = "Você deve preencher o campo de senha!";
}

class LoginController {
    static $inject = ['$scope', '$rootScope', '$localStorage', 'LoginService'];

    constructor(
        private $scope: ILoginScope,
        private $rootScope: any,
        private $localStorage: any,
        private loginService: LoginService
    ) {
        this.$scope.loading = false;
        this.$scope.$ctrl = this;

        if( this.$localStorage.userSession !== undefined) {
            this.$rootScope.pageNavigator.pushPage('pages/dashboard/dashboard.html');
        }
    }

    attemptLogin(username:string, password:string) {
        let promise = this.loginService.attemptLogin(username, password);
        promise.then( (res: any) => {
            let authkey = res.token;
            var session: UserSession = new UserSession("1", username, authkey);
            console.log(session);
            this.$rootScope.pageNavigator.pushPage('pages/dashboard/dashboard.html');
            
            this.$localStorage.userSession = session;
        }, (res:any) => {
            console.log(res);
        });
    }
}

class LoginService {
    static $inject = ['$timeout', '$q', '$http', '$httpParamSerializer'];

    constructor(
        private $timeout: ng.ITimeoutService,
        private $q: ng.IQService,
        private $http : ng.IHttpService,
        private $httpParamSerializer : any
    ){
    }

    attemptLogin(username: string, password: string): ng.IPromise<{}> {
        var defer = this.$q.defer();
        if(!username || username.length === 0 || username === '') {
            defer.reject(LoginStatus.NO_USERNAME_PROVIDED);
        }
        if(!password || password.length === 0 || password === ''){
            defer.reject(LoginStatus.NO_PASSWORD_PROVIDED);
        }

        let query: string = "authenticate";
        let data: any = {
            name: username,
            password: password
        };
        let config: any = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        this.$http.post(`${LOCAL_API}${query}`,this.$httpParamSerializer(data), config).then( (res: any) => {
            defer.resolve(res);
        });
        return defer.promise;
    }
}

class UserSession {
    private userId: string;
    private authKey: string;
    private username: string;

    constructor(userId: string, username: string, authkey: string) {
        this.userId = userId;
        this.username = username;
        this.authKey = authkey;
    }

    public destroy() {
        this.userId = null;
        this.authKey = null;
        this.username = null;
    }
}
