var app = angular.module("confluente");

app.controller("activityDeleteController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activity) {
    var activityId = $routeParams.activityId;
    activity.get(activityId).then(function (activity) {
        $scope.activity = activity;
        console.log($scope);
    });

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        activity.delete($scope.activity.id).then(function () {
            $scope.loading = false;
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
