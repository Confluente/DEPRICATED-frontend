var app = angular.module("confluente");

app.controller("manageController", ["$scope", function ($scope) {
  $scope.loading = false;
}]);

module.exports = {
  name: "Management Dashboard",
  url: "/manage",
  parent: "/",
  templateUrl: "/manage.html",
  controller: "manageController"
};
