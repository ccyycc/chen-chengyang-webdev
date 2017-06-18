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
            resetHighLight();
            //header
            model.header = "Login";
            model.back = "#!/";
            model.topRightOperationIcon = 'glyphicon glyphicon-plus'
            model.topRightOperation = model.register;
        }

        function resetHighLight() {
            model.usernameStyle = "";
            model.passwordSytle = "";
        }


        function login() {
            resetHighLight();
            var valid = true;
            model.message = "";

            if (model.username === undefined || model.username === "") {
                appendMessage("username is required");
                model.usernameStyle = "has-error has-feedback";
                valid = false;
            }
            if (model.password === undefined || model.password === "") {
                appendMessage("password is required");
                model.passwordSytle = "has-error has-feedback";
                valid = false;
            }
            if (valid) {
                userService
                    .login(model.username, model.password)
                    .then(successRender, errorRender)
            }else{
                model.message=model.message.substr(1);
                timeOut(5000);
            }
        }

        function appendMessage(message) {
            model.message += (';' + message);
        }

        function successRender(data) {
            $location.url('/profile');
        }

        function errorRender() {
            sendMessage("User is not found or password is incorrect.");
            model.usernameStyle = "has-error has-feedback";
            model.passwordSytle = "has-error has-feedback";

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