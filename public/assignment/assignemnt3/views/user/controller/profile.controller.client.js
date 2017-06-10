(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        //event handler.
        model.updateProfile = updateProfile;
        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.user = userService.findPageById(model.userId);
            //header
            model.header = "Profile";
            model.back = "#!/login";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok'
            model.topRightOperation = model.updateProfile;
        }

        function updateProfile() {
            userService.updatePage(model.userId,model.user);
            model.message="profile updated";
            console.log(userService.findPageById(model.userId));
        }



    }
})();