const app = angular.module("confluente");

/**
 * Controller for editing pages
 */
app.controller("pageEditController", ["$scope", "$routeParams", "pages", function ($scope, $routeParams, pages) {
    // get pageUrl from URL
    const pageUrl = $routeParams.pageUrl;

    $scope.loading = true;
    // get page from backend by pageUrl and set it on $scope
    pages.get(pageUrl).then(function (page) {
        $scope.page = page;
        $scope.loading = false;
    });

    // function called when edit is submitted
    $scope.submit = function () {
        $scope.loading = true;
        // submit edit to backend
        pages.edit($scope.page).then(function (result) {
            $scope.loading = false;
            // redirect to edited page
            window.location.href = "/page/" + $scope.page.url;
        });
    };
}]);

module.exports = {
    name: "Edit Page",
    url: "/manage/page/:pageUrl",
    parent: "/manage/page",
    templateUrl: "/www/templates/pages/pageEdit.html",
    controller: "pageEditController"
};
