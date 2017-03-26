var app = angular.module("confluente");

app.controller("activitiesController", ["$scope", "activities", function ($scope, activities) {
  activities.getAll().then(function (activities) {
    $scope.activities = activities;
  });
}]);

module.exports = {
  name: "Activities",
  url: "/activities",
  parent: "/",
  templateUrl: "/activities.html",
  iconUrl: "/img/home-outline.png",
  controller: "activitiesController"
};
