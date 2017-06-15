(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, websiteService,currentUser) {
        var model = this;
        //event handler
        model.newWebsite = newWebsite;

        init();

        function init() {
            //instance
            model.userId = currentUser._id;
            model.website = {};

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
            model.header = "Website List";
            model.back = "#!/profile";
            model.topRightOperationIcon = 'glyphicon glyphicon-plus';
            model.topRightOperation = newWebsite;
        }

        function newWebsite() {
            $location.url('/website/new');
        }

    }
})();