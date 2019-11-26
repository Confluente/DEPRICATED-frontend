var app = angular.module("confluente");

app.factory("pages", ["$http", "$timeout", function ($http, $timeout) {
    var pages = [];


    return {
        getAll: function () {
            return $http.get("/api/page").then(function (result) {
                //console.log(result);
                pages = result.data;
                return result.data;
            });
        },
        get: function (id) {
            return $http.get("/api/page/" + id).then(function (result) {
                return result.data;
            });
        },
        create: function (page) {
            //console.log(page);
            return $http.put("/api/page/" + page.url, page).then(function (result) {
                // console.log(result.data);
                return result.data;
            }, function (err) {
                console.error(err);
            });
        },
        edit: function (page) {
            return $http.put("/api/page/" + page.url, page).then(function (result) {
                // console.log(result.data);
                return result.data;
            });
        }
    };
}]);
