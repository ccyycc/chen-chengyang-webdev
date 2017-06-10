(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams, websiteService) {
        var model = this;
        //event handler
        model.newWebsite = newWebsite;

        init();

        function init() {
            //instance
            model.userId = $routeParams['uid'];
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
            model.back = "#!/user/" + model.userId;
            model.topRightOperationIcon = 'glyphicon glyphicon-plus'
            model.topRightOperation = newWebsite;
        }

        function newWebsite() {
            $location.url('/user/' + model.userId + '/website/new');
        }

    }
})();