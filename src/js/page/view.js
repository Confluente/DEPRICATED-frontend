var app = angular.module("confluente");

app.controller("pageViewController", ["$rootScope", "$scope", "$routeParams", function ($rootScope, $scope, $routeParams) {
    $scope.loading = true;
    $scope.templateUrl = getTemplateUrl($routeParams);
    var fallbackUrl = "/404.html";
    $scope.$on("$includeContentLoaded", function (e, src) {
        //Boo yah!
        $rootScope.title = getPageTitle(src);
    });
    $scope.$on("$includeContentError", function (e, src) {
        //Boo nah?
        if ($scope.templateUrl === fallbackUrl) {
            //404 page could not be found?
            //Something very bad is going on
            return;
        }
        $scope.templateUrl = fallbackUrl;
    });
}]);

function getTemplateUrl(routeParams) {
    return "/pages/" + routeParams.url + ".html";
}

function getPageTitle(url) {
    var title = url.split("/").slice(-1)[0].split(".")[0];
    return title.charAt(0).toUpperCase() + title.substr(1);
}

module.exports = {
    url: "/page/:url*",
    parent: "/",
    template: "<div class='page' ng-include='templateUrl'></div>",
    controller: "pageViewController"
};
