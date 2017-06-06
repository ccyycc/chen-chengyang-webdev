(function () {
    angular
        .module('WebAppMaker')
        .controller('twoColHeaderController', twoColHeaderController);


    function twoColHeaderController($location,$routeParams,
                                   websiteService,userService) {
        // var headerModel = this;
        // headerModel.userId = $routeParams['uid'];
        // console.log(headerModel.userId);
        //
        // //header
        // headerModel.leftHeader = "Website List";
        // headerModel.leftBack = "/user/uid";
        // headerModel.leftTopRightOperationIcon = 'glyphicon glyphicon-plus'
        // headerModel.leftTopRightOperation = newWebsite;
        //
        // function newWebsite() {
        //     $location.url('/user/uid/website/new');
        // }
        //
        //
        //
        // function init() {
        //     // headerModel.websites = websiteService.findWebsitesByUser(headerModel.userId);
        //     // headerModel.user = userService.findUserById(headerModel.userId)
        // }
        //
        // init();
    }
})();