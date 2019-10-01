var app = angular.module("confluente");

app.controller("pageManageController", ["$scope", "pages", function ($scope, pages) {
    pages.getAll().then(function (pages) {
        $scope.pages = pages;
    });
}]);

module.exports = {
    url: "/manage/page/",
    parent: "/manage",
    templateUrl: "/pageManage.html",
    controller: "pageManageController"
};
