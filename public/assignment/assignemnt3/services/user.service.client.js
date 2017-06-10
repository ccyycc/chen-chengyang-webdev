(function () {
    angular
        .module('WebAppMaker')
        .service('userService', userServiceFunction);

    function userServiceFunction() {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByUsername = findUserByUsername;
        this.findUserByCredentials = findUserByCredentials;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;


        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return cloneUser(user);
        }

        function findUserById(userId) {
            for (var u in users) {
                var user = users[u];
                if (user._id === userId) {
                    return cloneUser(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            var user = users.find(
                function (user) {
                    return user.username === username;
                });
            if (typeof user === 'undefined')
                return null;

            return cloneUser(user);
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    return cloneUser(user);
                }
            }
            console.log(users);
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = cloneUser(user);
                }
            }
            console.log(users);
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
            console.log(users);
        }

        function cloneUser(user) {
            return Object.assign({}, user);
            // return {
            //     _id: user._id,
            //     username: user.username,
            //     password: user.password,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email:user.email
            // };
        }
    }
})();