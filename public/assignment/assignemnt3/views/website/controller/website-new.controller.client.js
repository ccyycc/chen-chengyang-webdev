(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams,
                                  websiteService, userService) {
        var model = this;
        //event handler
        model.createNewWebsite = createNewWebsite;

        init();

        function init() {
            //initiating instance
            model.userId = $routeParams['uid'];
            model.user = userService.findUserById(model.userId)
            model.websites = websiteService.findWebsitesByUser(model.userId);

            //header
            // left panel
            model.leftBack = '#!/user/' + model.userId + "/website"
            model.leftHeader = "Website List";
            model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newWebsite;

            //right panel
            model.rightBack = '#!/user/' + model.userId + "/website";
            model.rightHeader = "New Website ";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = createNewWebsite;

        }

        function createNewWebsite() {
            websiteService.createWebsite(model.userId, model.website);
            $location.url('/user/' + model.userId + "/website");
        }

    }
})();