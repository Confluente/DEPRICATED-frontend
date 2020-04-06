var app = angular.module("confluente");

/**
 * Controller for creating pages
 */
app.controller("pageCreateController", ["$scope", "pages", function ($scope, pages) {
    $scope.loading = false;
    // function called when new page is submitted
    $scope.submit = function () {
        $scope.loading = true;
        // create page in backend
        pages.create($scope.page).then(function (result) {
            $scope.loading = false;
            // redirect to newly created page
            window.location.href = "/page/" + $scope.page.url;
        });
    };
}]);

module.exports = {
    name: "New Page",
    url: "/manage/page/create",
    parent: "/manage/page",
    templateUrl: "/www/templates/pages/pageCreate.html",
    controller: "pageCreateController"
};
