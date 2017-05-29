(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        //event handler.
        model.login = login;
        model.register = register;

        init();

        function init() {
            //header
            model.header = "Login";
            model.back = "#!/";
            model.topRightOperationIcon = 'glyphicon glyphicon-plus'
            model.topRightOperation = model.register;
        }

        function login() {
            var found = userService.findUserByCredentials(model.username, model.password);

            if (found !== null) {
                $location.url('/user/' + found._id);
                model.message = "Welcome " + model.username;
            } else {
                model.message = "Username " + model.username + " not found, please try again";
            }
        }

        function register() {
            $location.url('/register');
            console.log("call register function")
        }


    }
})();