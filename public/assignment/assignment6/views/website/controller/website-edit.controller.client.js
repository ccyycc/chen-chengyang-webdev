(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, websiteService, currentUser) {
        var model = this;

        //event handler
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        init();

        function init() {

            model.userId = currentUser._id;
            model.websiteId = $routeParams['wid'];
            model.websiteNameStyle = "";
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
            model.leftBack = "#!/website";
            model.leftHeader = "Website List";
            model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newWebsite;
            //right panel
            model.rightBack = "#!/website";
            model.rightHeader = "Edit Website ";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = updateWebsite;
        }

        function updateWebsite() {
            model.websiteNameStyle = "";
            if (model.website.name) {
                websiteService.updateWebsite(model.websiteId, model.website)
                    .then(navToWebsite, error);
            } else {
                model.errorMessage = "website name is require";
                model.websiteNameStyle = "has-error";
            }
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(navToWebsite, error);
        }

        function navToWebsite() {
            $location.url("/website");
        }

        function navToPage() {
            $location.url("/website/" + model.websiteId + "/page");
        }


        function error() {
            alert("error, please try again");
        }
    }
})();