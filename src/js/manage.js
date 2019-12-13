var app = angular.module("confluente");

app.controller("manageController", ["$scope", "$q", "pages", "activities", "users", "groups",
    function ($scope, $q, pages, activities, users, groups) {
        $scope.loading = true;
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

        // Ugly repeated code
        $scope.sortTypeActivities = 'id';
        $scope.sortReverseActivities = false;
        $scope.searchQueryActivities = '';
        $scope.sortActivities = function (type) {
            if ($scope.sortTypeActivities === type) {
                $scope.sortReverseActivities = !$scope.sortReverseActivities;
            } else {
                $scope.sortReverseActivities = false;
            }
            $scope.sortTypeActivities = type;
        };

        $scope.sortTypeUsers = 'id';
        $scope.sortReverseUsers = false;
        $scope.searchQueryUsers = '';
        $scope.sortUsers = function (type) {
            if ($scope.sortTypeUsers === type) {
                $scope.sortReverseUsers = !$scope.sortReverseUsers;
            } else {
                $scope.sortReverseUsers = false;
            }
            $scope.sortTypeUsers = type;
        };

        $scope.sortTypeGroups = 'id';
        $scope.sortReverseGroups = false;
        $scope.searchQueryGroups = '';
        $scope.sortGroups = function (type) {
            if ($scope.sortTypeGroups === type) {
                $scope.sortReverseGroups = !$scope.sortReverseGroups;
            } else {
                $scope.sortReverseGroups = false;
            }
            $scope.sortTypeGroups = type;
        };
    }]
);

module.exports = {
    name: "Management Dashboard",
    url: "/manage",
    parent: "/",
    templateUrl: "/www/pages/manage.html",
    controller: "manageController"
};
