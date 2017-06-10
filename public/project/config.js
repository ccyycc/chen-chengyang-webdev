(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "views/map/templates/map-search.view.client.html",
                controller: 'mapSearchController',
                controllerAs: 'model'
            })
            .when('/maps', {
                templateUrl: "views/map/templates/map-search.view.client.html",
                controller: 'mapSearchController',
                controllerAs: 'model'
            })
    }
})();