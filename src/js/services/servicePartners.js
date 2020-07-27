var app = angular.module("confluente");

/**
 * Factory for partners
 */
app.factory("partners", ["$http", "$timeout", function ($http, $timeout) {
    return {
        getInternships: function () {
            return $http.get("/api/partners/internships").then(function (result) {
                return result.data;
            });
        },

        getInternship: function (id) {
            return $http.get("/api/partners/internships/" + id).then(function (result) {
                return result.data;
            })
        },

        createInternship: function (newInternship) {
            return $http.post("/api/partners/internships", newInternship).then(function (result) {
                return result.data;
            });
        },

        editInternship: function (internship) {
            return $http.put("/api/partners/internships/" + internship.id, internship).then(function (result) {
                return result.data;
            })
        }
    };
}]);