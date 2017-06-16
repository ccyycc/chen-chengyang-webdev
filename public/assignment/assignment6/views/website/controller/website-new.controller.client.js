(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, websiteService, currentUser) {
        var model = this;
        //event handler
        model.createNewWebsite = createNewWebsite;

        init();

        function init() {
            model.website = {};
            //initiating instance
            model.userId = currentUser._id;
            websiteService.findWebsitesByUser(model.userId)
                .then(
                    function (websites) {
                        model.websites = websites;
                    },
                    function () {
                        model.websites = undefined;
                    }
                );
            //header
            // left panel
            model.leftBack = "#!/website";
            model.leftHeader = "Website List";
            model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newWebsite;

            //right panel
            model.rightBack = "#!/website";
            model.rightHeader = "New Website ";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = createNewWebsite;

        }

        function createNewWebsite() {
            if (model.website.name) {
                websiteService.createWebsite(model.userId, model.website)
                    .then(navToWebsite, error);
            } else {
                model.errorMessage = "website name is require";
            }
        }

        function navToWebsite() {
            $location.url("/website");

        }

        function error() {
            alert("error, please try again");
        }

    }
})();