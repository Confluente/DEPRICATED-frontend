var app = angular.module("confluente");

app.controller("pageViewController", ["$rootScope", "$scope", "$routeParams", "$http", function ($rootScope, $scope, $routeParams, $http) {
  $scope.loading = true;
  console.log("loaded");
  $http.get(getTemplateUrl($routeParams)).then(function (result) {
    $scope.loading = false;
    console.log(result, result.data);
    $scope.html = result.data.html;
    $rootScope.title = result.data.title;
  });
}]);

function getTemplateUrl(routeParams) {
  return "/api/page/" + routeParams.url + "?render=true";
}

module.exports = {
  url: "/page/:url*",
  parent: "/",
  template: "<div class='page' ng-bind-html='html'></div>",
  controller: "pageViewController"
};
