(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams,
                                   websiteService, userService) {
        var model = this;

        //event handler
        model.deletePage = deleteWebsite;
        model.updatePage = updateWebsite;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.user = userService.findPageById(model.userId)
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findPageById(model.websiteId);

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
            websiteService.updatePage(model.websiteId, model.website);
            $location.url('/user/' + model.userId + "/website");
        }

        function deleteWebsite() {
            websiteService.deletePage(model.websiteId);
            console.log("finish delete");
            $location.url('/user/' + model.userId + "/website");
        }


    }
})();