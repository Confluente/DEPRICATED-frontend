var app = angular.module("confluente");

/**
 * Controller for viewing activity
 */
app.controller("activityViewController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
    // get activity from backend based on activityId and set on $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
    });
}]);

module.exports = {
    name: "Activity",
    url: "/activities/:activityId",
    parent: "/activities/",
    templateUrl: "/www/templates/activities/activityDetails.html",
    controller: "activityViewController"
};
