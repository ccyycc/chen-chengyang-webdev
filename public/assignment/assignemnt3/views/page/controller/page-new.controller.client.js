(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService, userService) {
        var model = this;
        //event handler
        model.createNewPage = createNewPage;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pages = pageService.findPageByWebsiteId(model.websiteId);

            //header
            //left panel
            model.leftHeader = "Page List";
            model.leftBack = '#!/user/' + model.userId + "/website/" + model.websiteId + "/page";
            // model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newPage;

            //right panel
            model.rightHeader = "New page ";
            model.rightBack = '#!/user/' + model.userId + "/website/" + model.websiteId + "/page";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = model.createNewPage;
        }

        function createNewPage() {
            model.page.websiteId = model.websiteId;
            pageService.createWebsite(model.websiteId, model.page);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();