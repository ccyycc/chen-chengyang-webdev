(function () {
    angular
        .module('WebAppMaker')
        .controller('mapSearchController', mapSearchController);

    function mapSearchController($http,$location, $routeParams, $sce,mapSearchService) {
        var model = this;


        init();

        function init() {
            var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDWDGBQg0OOggV3glE5wcNcFOXhSntbj1Y"
            // mapSearchService.searchStore()
            //     // .then(function(storeList){
            //     //     console.log(storeList);
            //     // })
            $http.get(url).then(
                function () {
                    // alert("success")
                },
                function (data){
                    console.log(data)
                    // alert("fail");
                }

                );
        }
    }
})();