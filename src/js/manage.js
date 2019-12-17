var app = angular.module("confluente");

/**
 * Controller for the management table
 */
app.controller("manageController", ["$rootScope", "$scope", "$q", "pages", "activities", "users", "groups",
    function ($rootScope, $scope, $q, pages, activities, users, groups) {
        $scope.loading = true;
        //Wait until all data is retrieved
        //This is a bad approach and I should be ashamed
        //In the future, perhaps create a new directive/scope for each tab

        // retrieve all data
        activities.getAllManage().then(function (activities) {
            $scope.activities = activities;
        });
        if ($rootScope.user.isAdmin) {
            users.getAll().then(function (users) {
                $scope.users = users;
            });
            pages.getAll().then(function (pages) {
                $scope.pages = pages;
            });
            groups.getAll().then(function (groups) {
                $scope.groups = groups;
            });
        }

        // Ugly repeated code
        // $scope variables for tracking search & sorting in activities tab
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

        // $scope variables for tracking search & sorting in users tab
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

        // $scope variables for tracking search & sorting in groups tab
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
