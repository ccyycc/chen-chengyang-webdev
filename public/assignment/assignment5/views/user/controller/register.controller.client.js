(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, $timeout, userService) {

        var model = this;
        model.register = register;

        init();

        function init() {
            // header
            model.header = "Register";
            model.back = "#!/login";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok'
            model.topRightOperation = model.register;
        }

        function register() {

            if (!isValid(model.username, model.password, model.reEnterPassword)) {
                return;
            }
            // var user = userService.findUserByUsername(model.username);
            var user = userService.findUserByUsername(model.username)
                .then(function () {
                        sendMessage(model.username + " exist, please try different user name");
                    },
                    function () {
                        user = {
                            username: model.username,
                            password: model.password
                        };
                        userService.createUser(user)
                            .then(function (user) {
                                $location.url('/user/' + user._id);
                            });
                    });

        }

        // function createUser(user){
        //     user = userService.createUser(user)
        //         .then(function (user) {
        //             return user;
        //         });
        //     $location.url('/user/' + user._id);
        // }

        function isValid(username, password, reptPassword) {
            if (username == null || username == "") {
                sendMessage("please enter username")
                return false;
            }
            if (password == null || password == "") {
                sendMessage("please enter password")
                return false;
            }
            if (reptPassword == null || reptPassword == "") {
                sendMessage("please re-enter password");
                return false;
            }

            if (password !== reptPassword) {
                sendMessage("password is not equal.");
                return false;
            }
            return true;
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