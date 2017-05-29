(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {
        var model = this;
        //event handler.
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);

            //header
            //left panel
            model.leftHeader = "Page List";
            model.leftBack = '#!/user/' + model.userId + "/website/" + model.websiteId + "/page";

            //right panel
            model.rightHeader = "Edit page ";
            model.rightBack = '#!/user/' + model.userId + "/website/" + model.websiteId + "/page";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = updatePage;
        }

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page");
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page");
        }


    }
})();