var app = angular.module("confluente");

/**
 * Factory for pages
 */
app.factory("pages", ["$http", "$timeout", function ($http, $timeout) {
    var pages = [];

    return {
        /**
         * Function for retrieving all pages from backend
         * @returns pages
         */
        getAll: function () {
            return $http.get("/api/page").then(function (result) {
                pages = result.data;
                return result.data;
            });
        },
        /**
         * Function for retrieving single page from backend based on id
         * @param id
         * @returns requested page
         */
        get: function (id) {
            return $http.get("/api/page/" + id).then(function (result) {
                return result.data;
            });
        },
        /**
         * Function for submitting created page to backend
         * @param page
         * @returns submitted page
         */
        create: function (page) {
            return $http.put("/api/page/" + page.url, page).then(function (result) {
                return result.data;
            }, function (err) {
                // currently nothing done
            });
        },
        /**
         * Function for submitting edited page to backend
         * @param page
         * @returns submitted edited page
         */
        edit: function (page) {
            return $http.put("/api/page/" + page.url, page).then(function (result) {
                return result.data;
            });
        }
        // TODO implement delete
    };
}]);
