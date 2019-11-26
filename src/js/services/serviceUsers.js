var app = angular.module("confluente");

app.factory("users", ["$http", "$timeout", function ($http, $timeout) {

    return {
        getAll: function () {
            return $http.get("/api/user").then(function (result) {
                return result.data;
            });
        },
        // Get single user by ID
        get: function (id) {
            return $http.get("/api/user/" + id).then(function (result) {
                return result.data;
            }, function (err) {
                // window.location.href = "/www/" + err.status  + ".html";
            });
        },
        create: function (user) {
            // console.log(user);
            return $http.post("/api/user", user).then(function (result) {
                // console.log(result.data);
                return result.data;
            }, function (err) {
                console.error(err);
                return err;
            });
        },
        edit: function (user, groupSelection) {
            return $http.put("/api/user/" + user.id, [user, groupSelection]).then(function (result) {
                return result.data;
            });
        },
        changePassword: function (user) {
            return $http.put("/api/user/changePassword/" + user.id, user).then(function (result) {
                return result.data;
            }, function (err) {
                console.error(err);
            });
        },
        delete: function (user) {
            return $http.delete("/api/user/" + user.id);
        }
    };
}]);
