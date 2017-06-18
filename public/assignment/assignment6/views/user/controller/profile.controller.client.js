(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $timeout, userService,currentUser) {
        var model = this;
        //event handler.
        model.updateProfile = updateProfile;
        model.deleteProfile = deleteProfile;
        model.logout = logout;
        init();

        function init() {
            model.userId = currentUser._id;
            model.user = currentUser;
            //header
            model.header = "Profile";
            model.back = "#!/";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok';
            model.topRightOperation = model.updateProfile;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
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

        // function findUserById(userId) {
        //     userService.findUserById(userId)
        //         .then(userRender, errorRender)
        // }

        function userRender(user) {
            model.user = user;
        }

        function errorRender() {
            sendMessage("could not found user id");
        }


        function sendMessage(message) {
            model.message = message;
            timeOut(5000);
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