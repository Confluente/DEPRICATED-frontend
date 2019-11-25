var app = angular.module("confluente");

app.controller("activityViewController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    var activityId = $routeParams.activityId; // TODO: WHY is activityId unresolved
    // console.log(activityId);
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
