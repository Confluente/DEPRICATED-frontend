var app = angular.module("confluente");

app.controller("activitiesController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = true;
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
