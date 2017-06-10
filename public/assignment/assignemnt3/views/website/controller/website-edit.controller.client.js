(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams,
                                   websiteService, userService) {
        var model = this;

        //event handler
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.user = userService.findUserById(model.userId)
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);

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
            websiteService.updateWebsite(model.websiteId, model.website);
            $location.url('/user/' + model.userId + "/website");
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            console.log("finish delete");
            $location.url('/user/' + model.userId + "/website");
        }


    }
})();