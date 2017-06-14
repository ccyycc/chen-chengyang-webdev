(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {
        var model = this;
        //event handler
        model.createNewPage = createNewPage;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            
            pageService.findPageByWebsiteId(model.websiteId)
                .then(
                    function (pages){
                        model.pages = pages;
                    },
                    function(){
                        alert("cannot find pages with website id");
                        navToWebsite();

                    }
                );

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
            model.page.wid = model.websiteId;
            pageService.createWebsite(model.websiteId, model.page)
                .then(navToPage,function(){
                    alert("fail to create a page, please try again.")
                });
        }

        function navToWebsite() {
            $location.url('/user/' + model.userId + "/website/");
        }

        function navToPage() {
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();