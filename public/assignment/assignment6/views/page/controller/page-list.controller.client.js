(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, pageService,currentUser) {
        var model = this;
        //event handler
        model.newPage = newPage;

        init();

        function init() {
            model.userId = currentUser._id;
            model.websiteId = $routeParams['wid'];
            model.pages = pageService.findPageByWebsiteId(model.websiteId)
                .then(
                    function(pages){
                        model.pages=pages;
                    },
                    function(){
                        alert("cannot find pages for websites");
                        $location.url('/website');
                    }
                );

            //header
            model.header = "Page List";
            model.back = "/website/";
            model.topRightOperationIcon = 'glyphicon glyphicon-plus';
            model.topRightOperation = model.newPage;
        }

        function newPage() {
            $location.url('/website/' + model.websiteId + "/page/new");
        }

    }
})();