(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {
        var model = this;

        //event handler
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            websiteService.findWebsitesByUser(model.userId)
                .then(
                    function (websites) {
                        model.websites = websites;
                    },
                    function () {
                        model.websites = undefined;
                    }
                );
            websiteService.findWebsiteById(model.websiteId)
                .then(
                    function (website) {
                        model.website = website;
                    },
                    function () {
                        alert("website is not exited")
                        navToWebsite();
                    }
                );

            //header
            //left panel
            model.leftBack = '#!/user/' + model.userId + "/website";
            model.leftHeader = "Website List";
            model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newWebsite;
            //right panel
            model.rightBack = '#!/user/' + model.userId + "/website";
            model.rightHeader = "Edit Website ";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = updateWebsite;
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website)
                .then(navToWebsite, error);
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(navToWebsite, error);
        }

        function navToWebsite() {
            $location.url('/user/' + model.userId + "/website");
        }

        function navToPage() {
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page");
        }


        function error() {
            alert("error, please try again");
        }
    }
})();