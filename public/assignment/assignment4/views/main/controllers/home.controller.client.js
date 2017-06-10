/**
 * Created by ccy on 5/25/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController($routeParams,
                            $location,
                            websiteService) {
        var model = this;

        function init() {
            $location.url("../templates/home.view.client.html");
        }

        init();
    }
})();