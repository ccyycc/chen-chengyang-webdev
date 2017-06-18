(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService, currentUser) {
        var model = this;
        //event handler
        model.createNewPage = createNewPage;

        init();

        function init() {
            model.page = {};
            model.userId = currentUser._id;
            model.websiteId = $routeParams['wid'];
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

            //header
            //left panel
            model.leftHeader = "Page List";
            model.leftBack = "#!/website/" + model.websiteId + "/page";
            // model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newPage;

            //right panel
            model.rightHeader = "New page ";
            model.rightBack = "#!/website/" + model.websiteId + "/page";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = model.createNewPage;
        }

        function createNewPage() {
            model.pageNameStyle = "";
            if (model.page.name) {
                model.page.wid = model.websiteId;
                pageService.createPage(model.websiteId, model.page)
                    .then(navToPage, function () {
                        alert("fail to create a page, please try again.")
                    });
            } else {
                model.errorMessage = "page name is require";
                model.pageNameStyle = "has-error";
            }
        }

        function navToWebsite() {
            $location.url("/website/");
        }

        function navToPage() {
            $location.url("/website/" + model.websiteId + "/page");
        }
    }
})();