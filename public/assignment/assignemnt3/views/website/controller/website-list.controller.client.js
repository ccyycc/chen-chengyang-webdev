(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams,
                                   websiteService, userService) {
        var model = this;
        //event handler
        model.newWebsite = newWebsite;

        init();

        function init() {
            //instance
            model.userId = $routeParams['uid'];
            model.user = userService.findUserById(model.userId)
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = {};

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