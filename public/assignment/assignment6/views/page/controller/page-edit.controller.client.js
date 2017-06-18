(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService, currentUser) {
        var model = this;
        //event handler.
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        init();

        function init() {
            model.userId = currentUser._id;
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.pageNameStyle = "";
            pageService.findPageByWebsiteId(model.websiteId)
                .then(
                    function (pages) {
                        model.pages = pages;
                    },
                    function () {
                        alert("cannot find pages with website id");
                        navToWebsite();
                    }
                );
            pageService.findPageById(model.pageId)
                .then(
                    function (page) {
                        model.page = page;
                    },
                    function () {
                        alert("cannot find page with page id");
                        navToPage();
                    }
                );

            //header
            //left panel
            model.leftHeader = "Page List";
            model.leftBack = "#!/website/" + model.websiteId + "/page";

            //right panel
            model.rightHeader = "Edit page ";
            model.rightBack = "#!/website/" + model.websiteId + "/page";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = updatePage;
        }

        function updatePage() {
            model.pageNameStyle = "";
            if (model.page.name) {
                pageService.updatePage(model.pageId, model.page)
                    .then(navToPage, error);
            } else {
                model.errorMessage = "page name is require";
                model.pageNameStyle = "has-error";
            }
        }

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(navToPage, error);
        }


        function navToPage() {
            $location.url("/website/" + model.websiteId + "/page");
        }

        function navToWebsite() {
            $location.url("/website");
        }

        function error() {
            alert("error, try again");
        }


    }
})();