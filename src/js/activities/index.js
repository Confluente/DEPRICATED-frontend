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

        // Set variable 'subscribed' on all activity objects to indicate whether the current user has subscribed to them
        for (var i = 0; i < activities.length; i++) {
            $scope.activities[i].subscribed = false;
            for (var j = 0; j < $scope.activities[i].participants.length; j++) {
                if ($scope.activities[i].participants[j].id === $scope.user.id) {
                    $scope.activities[i].subscribed = true;
                    break;
                }
            }
        }

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
