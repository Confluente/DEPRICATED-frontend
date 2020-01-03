var app = angular.module("confluente");

/**
 * Controller for viewing activity
 */
app.controller("activityViewController", ["$scope", "$routeParams", "activities", "users", function ($scope, $routeParams, activities, user) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
    // get activity from backend based on activityId and set on $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        $scope.user = $scope.$parent.user;
        if (activity.canSubscribe) {
            window.location.href = "/activities/" + activityId + "#signup";
        }
        $scope.answers = [];
        for (var i = 0; i < activity.numberOfQuestions; i++) {
            $scope.answers.push("");
        }
        console.log($scope);
    });

    $scope.submit = function () {
        $scope.loading = true;
        // create new activity from variables as put on the $scope by the form
        activities.subscribe($scope.answers, activityId).then(function (result) {
            $scope.loading = false;

            // redirect to new activity
            window.location.href = "/activities/" + activityId;
        });
    }
}]);

module.exports = {
    name: "Activity",
    url: "/activities/:activityId",
    parent: "/activities/",
    templateUrl: "/www/templates/activities/activityDetails.html",
    controller: "activityViewController"
};
