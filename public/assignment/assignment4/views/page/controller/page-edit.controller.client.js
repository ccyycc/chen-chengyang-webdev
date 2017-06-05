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
            pageService.findPageByWebsiteId(model.websiteId)
                .then(
                    function (pages){
                        model.pages = pages;
                    },
                    function(){
                        alert("cannot find pages with website id");
                    }
                );
            pageService.findPageById(model.pageId)
                .then(
                    function(page){
                        model.page = page;
                    },
                    function(){
                        alert("cannot find page with page id");
                    }
                );

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
            pageService.updatePage(model.pageId, model.page)
                .then(navToPage);
        }

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(navToPage);
        }

        function navToPage() {
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page");
        }



    }
})();