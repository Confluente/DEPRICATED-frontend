var app = angular.module("confluente");

app.controller("activityViewController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
  var activityId = $routeParams.activityId;
  console.log(activityId);
  activities.get(activityId).then(function (activity) {
    $scope.activity = activity;
  });
}]);

module.exports = {
  name: "Activity",
  url: "/activities/:activityId",
  parent: "/activities/",
  templateUrl: "/activityDetails.html",
  controller: "activityViewController"
};
