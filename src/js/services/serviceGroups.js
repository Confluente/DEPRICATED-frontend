var app = angular.module("confluente");

app.factory("groups", ["$http", "$timeout", function ($http, $timeout) {

    return {
        getAll: function () {
            return $http.get("/api/group").then(function (result) {
                return result.data;
            });
        },
        //Untested:
        get: function (id) {
            return $http.get("/api/group/" + id).then(function (result) {
                return result.data;
            });
        },
        create: function (group) {
            return $http.post("/api/group", group).then(function (result) {
                // console.log(result.data);
                return result.data;
            }, function (err) {
                // console.error(err);
                return err;
            });
        },
        edit: function (group) {
            // console.log(group);
            return $http.put("/api/group/" + group.id, group).then(function (result) {
                // console.log(result.data);
                return result.data;
            });
        },
        delete: function (group) {
            return $http.delete("/api/group/" + group.id);
        }
    };
}]);
