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
            // var url ="/api/user";
            // return $http.post(url,user)
            //     .then(returnData);

            var url ="/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }




        function findUserById(userId) {
           var url = "/api/user/"+userId;
            return $http.get(url)
                .then(returnData);
        }

        function findUserByUsername(username) {
            var url="/api/user?username=" + username;
            return $http.get(url)
                .then(returnData);
        }

        function findUserByCredentials(username, password) {
           var url = "/api/user?username="+username+"&password="+password;
           return $http.get(url)
               .then(function (response){
                   return response.data;
               });
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+user._id;
            return $http.put(url,user)
                .then(function (response){
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                })
        }

        function returnData(response){
            return response.data;
        }
    }
})();