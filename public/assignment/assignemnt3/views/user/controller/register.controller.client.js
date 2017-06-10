(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

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
            var user = userService.findUserByUsername(model.username);

            if (user !== null) {
                model.message = model.username + " exist, please try different user name";
            } else {
                user = {
                    username: model.username,
                    password: model.password
                };
                user = userService.createUser(user);
                $location.url('/user/' + user._id);

            }
        }

        function isValid(username, password, reptPassword) {
            if (username == null || username == "") {
                model.message = "please enter username"
                return false;
            }
            if (password == null || password == "") {
                model.message = "please enter password"
                return false;
            }
            if (reptPassword == null || reptPassword == "") {
                model.message = "please re-enter password"
                return false;
            }

            if (password !== reptPassword) {
                model.message = "password is not equal."
                return false;
            }
            return true;
        }
    }
})();