var app = angular.module("confluente");

app.controller("pageViewController", ["$scope", "$routeParams", "pages", function ($scope, $routeParams, pages) {

}]);

function getTemplateUrl(routeParams) {
  console.log(routeParams);
  return "/api/page/" + routeParams.url + "/view";
}

module.exports = {
  url: "/page/:url*",
  parent: "/",
  templateUrl: getTemplateUrl,
  controller: "pageViewController"
};
