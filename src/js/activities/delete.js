var app = angular.module("confluente");

/**
 * Controller for deleting activities
 */
app.controller("activityDeleteController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activity) {
    // get activityID from URL
    var activityId = $routeParams.activityId;

    // get activity from backend via activityId, and put it on the $scope
    activity.get(activityId).then(function (activity) {
        $scope.activity = activity;
    });

    $scope.loading = false;
    // function called when deleting is confirmed
    $scope.submit = function () {
        $scope.loading = true;
        // communicates with backend to delete activity (identified by id)
        activity.delete($scope.activity.id).then(function () {
            $scope.loading = false;
            // redirect to '/manage'
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Delete Activity",
    url: "/manage/activities/delete/:activityId",
    parent: "/manage/",
    templateUrl: "/www/templates/activities/activityDelete.html",
    iconUrl: "/img/home-outline.png",
    controller: "activityDeleteController"
};
