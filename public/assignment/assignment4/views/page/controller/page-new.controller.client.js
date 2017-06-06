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
            model.wid = $routeParams['wid'];
            
            pageService.findPageByWebsiteId(model.wid)
                .then(
                    function (pages){
                        model.pages = pages;
                    },
                    function(){
                        alert("cannot find pages with website id");
                    }
                );

            //header
            //left panel
            model.leftHeader = "Page List";
            model.leftBack = '#!/user/' + model.userId + "/website/" + model.wid + "/page";
            // model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newPage;

            //right panel
            model.rightHeader = "New page ";
            model.rightBack = '#!/user/' + model.userId + "/website/" + model.wid + "/page";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = model.createNewPage;
        }

        function createNewPage() {
            model.page.wid = model.wid;
            pageService.createPage(model.wid, model.page)
                .then(navToPage,function(){
                    alert("fail to create a page, please try again.")
                });
        }

        function navToPage() {
            $location.url('/user/' + model.userId + "/website/" + model.wid + "/page");
        }
    }
})();