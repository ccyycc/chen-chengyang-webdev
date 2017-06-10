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


        function createUser(user) {
            var url ="/api/user";
            return $http.post(url, user)
                .then(extractData);
        }

        function findUserById(userId) {
           var url = "/api/user/"+userId;
            return $http.get(url)
                .then(extractData);
        }

        function findUserByUsername(username) {
            var url="/api/user?username=" + username;
            return $http.get(url)
                .then(extractData);
        }

        function findUserByCredentials(username, password) {
           var url = "/api/user?username="+username+"&password="+password;
           return $http.get(url)
               .then(extractData);
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url,user)
                .then(extractData)
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url)
                .then(extractData)
        }

        function extractData(response){
            return response.data;
        }
    }
})();