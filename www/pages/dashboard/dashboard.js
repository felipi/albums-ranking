var DashboardController = (function () {
    function DashboardController(albumsService, $scope, $rootScope, $localStorage) {
        this.albumsService = albumsService;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;
        this.$scope.$ctrl = this;
        this.$scope.isLoading = false;
        this.pageNavigator = this.$rootScope.pageNavigator;
        var promise = this.fetchAlbums();
    }
    DashboardController.prototype.fetchAlbums = function () {
        this.$scope.isLoading = true;
        var _self = this;
        var res = this.albumsService.fetchAlbums();
        var Albums = res.fetch({ page: 1 }).$promise.then(function (res) {
            _self.$scope.fetchedAlbums = res;
        }).finally(function () {
            _self.$scope.isLoading = false;
        });
        return Albums;
    };
    return DashboardController;
}());
DashboardController.$inject = ['AlbumsService', "$scope", "$rootScope", "$localStorage"];
var AlbumsService = (function () {
    function AlbumsService($resource) {
        this.$resource = $resource;
    }
    AlbumsService.prototype.fetchAlbums = function () {
        var fetchAction = {
            method: 'GET',
            cache: true,
            isArray: false
        };
        return this.$resource("" + API_URL, { method: 'user.gettopalbums', user: 'Kchopa', limit: 100, api_key: '4ea6e00dd7c40c8c2e9f9b8727983b27', format: 'json' }, {
            fetch: fetchAction
        });
    };
    return AlbumsService;
}());
AlbumsService.$inject = ['$resource'];
//# sourceMappingURL=dashboard.js.map