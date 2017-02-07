interface IAlbum extends ng.resource.IResource<IAlbum> {
    topalbums: any;
}
interface IDashboardScope extends ng.IScope {
    $ctrl: DashboardController;
    fetchedAlbums: IAlbum;
    isLoading: boolean;
}

interface IAlbumResource extends ng.resource.IResourceClass<IAlbum> {
    fetch({}): IAlbum;
}
class DashboardController {
    static $inject = ['AlbumsService', "$scope", "$rootScope", "$localStorage"];
    private pageNavigator: any;
    private datepickerStates: any;

    constructor (
        private albumsService: AlbumsService,
        public $scope: IDashboardScope,
        public $rootScope: any,
        public $localStorage: any
    ){
        this.$scope.$ctrl = this;
        this.$scope.isLoading = false;
        this.pageNavigator = this.$rootScope.pageNavigator;

        var promise = this.fetchAlbums();
    }

    fetchAlbums() {
        this.$scope.isLoading = true;
        var _self = this;
        let res:IAlbumResource = this.albumsService.fetchAlbums();
        let Albums = res.fetch({page: 1}).$promise.then( (res:any) => {
            _self.$scope.fetchedAlbums = res;
        }).finally( () =>{
            _self.$scope.isLoading = false;
        });

        return Albums;
    }
}

class AlbumsService {
    static $inject = ['$resource'];

    constructor(
        private $resource: ng.resource.IResourceService
    ){
    }
    
    fetchAlbums(): IAlbumResource {
        var fetchAction : ng.resource.IActionDescriptor = {
            method: 'GET',
            cache: true,
            isArray: false
        }
        
        return <IAlbumResource>this.$resource(`${API_URL}`, {method: 'user.gettopalbums', user: 'Kchopa', limit: 100, api_key:'4ea6e00dd7c40c8c2e9f9b8727983b27', format: 'json'}, {
            fetch: fetchAction
        });
    }
    
}
