(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, $timeout, userService) {

        var model = this;
        model.register = register;

        init();

        function init() {
            resetHighLight();
            // header
            model.header = "Register";
            model.back = "#!/login";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok';
            model.topRightOperation = model.register;
        }

        function register() {

            if (!isValid(model.username, model.password, model.reEnterPassword)) {
                return;
            }
            var user = userService.findUserByUsername(model.username)
                .then(
                    function (user) {
                        sendMessage(model.username + " exist, please try different user name");
                    },
                    function (user) {
                        user = {
                            username: model.username,
                            password: model.password
                        };
                        userService.register(user)
                            .then(function (user) {
                                $location.url('/profile');
                            });
                    });

        }

        function resetHighLight() {
            model.usernameStyle = "";
            model.passwordSytle = "";
            model.repasswordStyle = "";
        }

        function isValid(username, password, reptPassword) {

            resetHighLight();
            model.message = "";
            var valid = true;
            if (username === undefined || username === null || username === "") {
                appendMessage("username  is required");
                model.usernameStyle = "has-error has-feedback";
                valid = false;
            }
            if (password === undefined || password === null || password === "") {
                appendMessage("password is required");
                model.passwordSytle = "has-error has-feedback";
                valid = false;

            }
            if (reptPassword === undefined || reptPassword === null || reptPassword === "") {
                appendMessage("re-enter password is required");
                model.repasswordStyle = "has-error has-feedback";
                valid = false;
            }

            if (valid && password !== reptPassword) {
                appendMessage("passwords does not match.");
                model.passwordSytle = "has-error has-feedback";
                model.repasswordStyle = "has-error has-feedback";
                valid = false;
            }
            if (model.message.length > 1) {
                model.message = model.message.substr(1);
                timeOut(5000);
            }
            return valid;
        }

        function sendMessage(message) {
            model.message = message;
        }

        function appendMessage(message) {
            model.message += (';' + message);
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