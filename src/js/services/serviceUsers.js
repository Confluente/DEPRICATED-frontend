var app = angular.module("confluente");

/**
 * Factory for users
 */
app.factory("users", ["$http", "$timeout", function ($http, $timeout) {
    return {
        /**
         * Function for retrieving all users from backend
         * @returns users
         */
        getAll: function () {
            return $http.get("/api/user").then(function (result) {
                return result.data;
            });
        },
        /**
         * Function for retrieving single user from backend by id
         * @param id
         * @returns requested user
         */
        get: function (id) {
            return $http.get("/api/user/" + id).then(function (result) {
                return result.data;
            }, function (err) {
                // currently nothing done
            });
        },
        /**
         * Function for submitting created user to backend
         * @param user
         * @returns submitted user
         */
        create: function (user) {
            return $http.post("/api/user", user).then(function (result) {
                return result.data;
            }, function (err) {
                return err;
            });
        },
        /**
         * Function for submitting edited user to backend, including its relation to groups
         * @param user
         * @param groupSelection
         * @returns submitted edited user
         */
        edit: function (user, groupSelection) {
            return $http.put("/api/user/" + user.id, [user, groupSelection]).then(function (result) {
                return result.data;
            });
        },
        /**
         * Function for submitting changed password to backend
         * @param user
         */
        changePassword: function (user) {
            return $http.put("/api/user/changePassword/" + user.id, user).then(function (result) {
                return result.data;
            }, function (err) {
                // currently nothing done
            });
        },
        /**
         * Function for deleting user in backend
         * @param user
         */
        delete: function (user) {
            return $http.delete("/api/user/" + user.id);
        }
    };
}]);
