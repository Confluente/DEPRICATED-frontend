var app = angular.module("confluente");
app.controller("pageViewController", ["$rootScope", "$scope", "$routeParams", function ($rootScope, $scope, $routeParams) {
    $scope.loading = true;
    $scope.templateUrl = getTemplateUrl($routeParams);

    var fallbackUrl = "/www/pages/404.html";

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
    return "/www/pages/" + routeParams.url + ".html";
}

function getPageTitle(url) {
    var name = url.split("/").slice(-1)[0].split(".")[0];
    var words = name.split('_');
    var title = '';
    for (var i = 0; i < words.length; i++) {
        title += ' ' + words[i].charAt(0).toUpperCase() + words[i].substr(1);
    }
    return title.substr(1);
}

module.exports = {
    url: "/:url*",
    parent: "/",
    template:"<div class='container' ng-include='templateUrl'></div>",
    controller:"pageViewController"
};
