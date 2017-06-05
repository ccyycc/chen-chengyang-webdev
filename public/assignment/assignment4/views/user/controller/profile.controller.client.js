(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location,$routeParams, $timeout, userService) {
        var model = this;
        //event handler.
        model.updateProfile = updateProfile;
        model.deleteProfile = deleteProfile;
        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.user = findUserById(model.userId);
            //header
            model.header = "Profile";
            model.back = "#!/login";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok'
            model.topRightOperation = model.updateProfile;
        }

        function updateProfile() {
            userService.updateUser(model.userId, model.user)
                .then(function () {
                    sendMessage("profile updated");

                }, function () {
                    sendMessage("update fail, try again.");
                })
        }

        function deleteProfile() {
            userService.deleteUser(model.userId)
                .then(function () {
                    $location.url('/login');
                });

        }

        function findUserById(userId) {
            userService.findUserById(userId)
                .then(userRender, errorRender)
        }

        function userRender(user) {
            model.user = user;
        }

        function errorRender() {
            sendMessage("could not found user id");
        }


        function sendMessage(message) {
            model.message = message;
            timeOut(1500);
        }

        function timeOut(t) {
            $timeout.cancel();
            $timeout(
                function () {
                    model.message = undefined;
                }, t)
        }

    }
})();