/**
 * Created by ccy on 5/25/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('homeController', homeController);

    function homeController( $route, userService, currentUser) {
        var model = this;

        model.logout = logout;

        init();
        function init() {
            model.username=currentUser.username;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                });
        }
    }
})();