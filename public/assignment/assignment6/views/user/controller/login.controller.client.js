(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, $timeout, userService) {

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
            if (model.username == null) {
                sendMessage("username is empty");
                timeOut(2000);
                return;
            }
            if (model.password == null) {
                sendMessage("password is empty");
                return
            }
            userService
                .login(model.username, model.password)
                .then(successRender, errorRender)
        }

        function successRender(data) {
            $location.url('/profile');
        }

        function errorRender() {
            sendMessage("User is not found or password is incorrect.");
        }

        function register() {
            $location.url('/register');
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