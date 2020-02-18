var app = angular.module("confluente");

/**
 * Controller for the management table
 */
app.controller("manageController", ["$rootScope", "$scope", "$q", "$timeout", "$http", "pages", "activities", "users", "groups",
    function ($rootScope, $scope, $q, $timeout, $http, pages, activities, users, groups) {
        $scope.loading = true;
        $scope.f = {
            date: new Date()
        };

        //Wait until all data is retrieved
        //This is a bad approach and I should be ashamed
        //In the future, perhaps create a new directive/scope for each tab

        // retrieve all data
        activities.getAllManage().then(function (activities) {
            $scope.archive = activities;
            $scope.filter();
        });


        // Have to wait for $rootScope to finish $digest() to read the $rootScope.user.isAdmin succesfully
        var waitForRenderAndDoSomething = function() {
            if ($http.pendingRequests.length > 0) {
                $timeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
            } else {
                //the code which needs to run after dom rendering
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
            }
        };
        $timeout(waitForRenderAndDoSomething); // Waits for first digest cycle

        $scope.$watch("f.date", function (newDate) {
            $scope.filter();
        });

        $scope.filter = function() {
            var date = $scope.f.date;
            $scope.activities = [];
            for (var i = 0; i < $scope.archive.length; i++) {
                if ($scope.archive[i].date >= date) {
                    $scope.activities.push($scope.archive[i]);
                }
            }
        };

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

        // function for using datepicker in form for creating activities
        $scope.datepicker = {open: false};
        $scope.openDatePicker = function () {
            $scope.datepicker.open = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2029, 5, 22), // maximum date for datepicker
            minDate: new Date(), // minimum date for datepicker
            startingDay: 1
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
