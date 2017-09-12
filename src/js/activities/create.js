var app = angular.module("confluente");

app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
  $scope.loading = false;
  $scope.submit = function () {
    $scope.loading = true;
    console.log($scope);
    activities.create({
      name: $scope.name,
      description: $scope.description,
      organizer: $scope.organizer,
      startTime: $scope.startTime,
      location: $scope.location,
      approved: true
    }).then(function (result) {
      $scope.loading = false;
      window.location.href = "/activities/" + result.id;
    });
  };
}]);

module.exports = {
  name: "New Activity",
  url: "/manage/activities/create",
  parent: "/manage/activities/",
  templateUrl: "/activityCreate.html",
  controller: "activityCreateController"
};
