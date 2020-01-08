var app = angular.module("confluente");

/**
 * Controller for viewing page
 */
app.controller("pageViewController", ["$rootScope", "$scope", "$routeParams", "$location", function ($rootScope, $scope, $routeParams, $location) {
    $scope.loading = true;
    // set URL to page in frontend directory on $scope
    $scope.templateUrl = getTemplateUrl($routeParams);

    // assign 404-url to variable
    var fallbackUrl = "/www/pages/404.html";

    /**
     * Sets the page title (used in browser-tab label)
     */
    $scope.$on("$includeContentLoaded", function (e, src) {
        $rootScope.title = getPageTitle($location);
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
