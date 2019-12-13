var app = angular.module("confluente");

/**
 * Controller for viewing page
 */
app.controller("pageViewController", ["$rootScope", "$scope", "$routeParams", function ($rootScope, $scope, $routeParams) {
    $scope.loading = true;
    // set URL to page in frontend directory on $scope
    $scope.templateUrl = getTemplateUrl($routeParams);

    // assign 404-url to variable
    var fallbackUrl = "/www/pages/404.html";

    // function called if page loaded
    $scope.$on("$includeContentLoaded", function (e, src) {
        // set title of page
        $rootScope.title = getPageTitle(src);
    });

    // function called if page failed to load
    $scope.$on("$includeContentError", function (e, src) {
        if ($scope.templateUrl === fallbackUrl) {
            //404 page could not be found?
            //Something very bad is going on
            return;
        }
        // set url to 404 page
        $scope.templateUrl = fallbackUrl;
    });

}]);

/**
 * Function for getting URL for page in frontend directory
 * @param routeParams
 * @returns {string}
 */
function getTemplateUrl(routeParams) {
    return "/www/pages/" + routeParams.url + ".html";
}

/**
 * Get page title from URL
 * @param url
 * @returns {string}
 */
function getPageTitle(url) {
    var title = url.split("/").slice(-1)[0].split(".")[0];
    return title.charAt(0).toUpperCase() + title.substr(1);
}

module.exports = {
    url: "/:url*",
    parent: "/",
    template:"<div class='container' ng-include='templateUrl'></div>",
    controller:"pageViewController"
};
