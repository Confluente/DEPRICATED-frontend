var app = angular.module("confluente");

app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
  var activityId = $routeParams.activityId;
  console.log(activityId);
  activities.get(activityId).then(function (activity) {
    $scope.activity = activity;
  });

  $scope.loading = false;
  $scope.submit = function () {
    $scope.loading = true;
    activities.edit($scope.activity).then(function (result) {
      $scope.loading = false;
      window.location.href = "/activities/" + result.id;
    });
  };

}]);

module.exports = {
  name: "Edit Activity",
  url: "/manage/activities/:activityId",
  parent: "/manage/activities",
  templateUrl: "/activityEdit.html",
  iconUrl: "/img/home-outline.png",
  controller: "activityEditController"
};
