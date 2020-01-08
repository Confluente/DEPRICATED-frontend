var app = angular.module("confluente");
app.controller("pageViewController", ["$rootScope", "$scope", "$routeParams", "$location", function ($rootScope, $scope, $routeParams, $location) {
    $scope.loading = true;
    $scope.templateUrl = getTemplateUrl($routeParams);

    var fallbackUrl = "/www/pages/404.html";

    /**
     * Sets the page title (used in browser-tab label)
     */
    $scope.$on("$includeContentLoaded", function (e, src) {
        //Boo yah!
        $rootScope.title = getPageTitle($location);
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

/**
 * Gets the current URL and deduced the page title from it
 */
function getPageTitle($location) {
    var name = $location.path().split("/").slice(-1)[0].split(".")[0];
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
