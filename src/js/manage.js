var app = angular.module("confluente");

app.controller("manageController", ["$scope", "$q", "pages", "activities", "users", "groups",
    function ($scope, $q, pages, activities, users, groups) {
        $scope.loading = true;
        console.log("manageController function called");
        //Wait until all data is retrieved
        //This is a bad approach and I should be ashamed
        //In the future, perhaps create a new directive/scope for each tab
        $q.all([
            pages.getAll().then(function (pages) {
                $scope.pages = pages;
            }),
            activities.getAll().then(function (activities) {
                $scope.activities = activities;
            }),
            users.getAll().then(function (users) {
                $scope.users = users;
            }),
            groups.getAll().then(function (groups) {
                $scope.groups = groups;
            }),
        ]).then(function () {
            $scope.loading = false;
        });
    }]
);

module.exports = {
    name: "Management Dashboard",
    url: "/manage",
    parent: "/",
    templateUrl: "/www/pages/manage.html",
    controller: "manageController"
};
