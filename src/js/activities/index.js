var app = angular.module("confluente");

/**
 * Controller for the index of all activities
 * Used in the activities overview page
 */
app.controller("activitiesController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = true;
    // function for getting all activities from current date onwards from backend
    activities.getAll().then(function (activities) {
        $scope.activities = activities;
        $scope.loading = false;
    });
}]);

module.exports = {
    name: "Activities",
    url: "/activities",
    parent: "/",
    templateUrl: "/www/templates/activities/activities.html",
    iconUrl: "/img/home-outline.png",
    controller: "activitiesController"
};
