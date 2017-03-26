var app = angular.module("confluente");

app.controller("pageCreateController", ["$scope", "pages", function ($scope, pages) {
  $scope.loading = false;
  $scope.submit = function () {
    $scope.loading = true;
    console.log($scope);
    pages.create($scope.page).then(function (result) {
      $scope.loading = false;
      window.location.href = "/page/" + $scope.page.url;
    });
  };
}]);

module.exports = {
  name: "New Page",
  url: "/manage/page/create",
  parent: "/manage/page",
  templateUrl: "/pageCreate.html",
  controller: "pageCreateController"
};
