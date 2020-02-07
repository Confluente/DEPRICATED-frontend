var app = angular.module("confluente");

/**
 * Controller for managing pages
 * Used in management table
 */
app.controller("pageManageController", ["$scope", "pages", function ($scope, pages) {
    // get all pages from backend
    pages.getAll().then(function (pages) {
        $scope.pages = pages;
    });
}]);

module.exports = {
    url: "/manage/page/",
    parent: "/manage",
    templateUrl: "/www/templates/pages/pageManage.html",
    controller: "pageManageController"
};
