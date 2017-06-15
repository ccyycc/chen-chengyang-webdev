(function () {
    angular
        .module('WebAppMaker')
        .service('userService', userServiceFunction);

    function userServiceFunction($http) {


        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByUsername = findUserByUsername;
        this.findUserByCredentials = findUserByCredentials;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;

        this.login = login;
        this.logout = logout;
        this.isLoggedIn = isLoggedIn;
        this.register = register;

        function register(user) {
            var url = "/api/assignment/register";

            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function isLoggedIn() {
            var url = "/api/assignment/isLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            console.log("in user.service.client - logout");
            var url = "/api/assignment/logout";

            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";

            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(extractData);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(extractData);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(extractData);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(extractData);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(extractData)
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(extractData)
        }

        function extractData(response) {
            return response.data;
        }
    }
})();