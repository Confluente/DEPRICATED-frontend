var app = angular.module("confluente");

/**
 * Factory for partners
 */
app.factory("partners", ["$http", "$timeout", function ($http, $timeout) {
    return {
        getInternships: function () {
            // return $http.get("/api/partners/internships").then(function (result) {
            //     return result;
            // });
            return [];
        }
    };
}]);