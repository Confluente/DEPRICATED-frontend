const app = angular.module("confluente");

/**
 * Controller for consent to portrait right
 */
app.controller("portraitRightController", ["$rootScope", "$scope", "notifications", function ($rootScope, $scope, notifications) {
    $scope.loading = false;
    $scope.consent = function () {
        $scope.loading = true;
        notifications.portraitRight($rootScope.user.id, true).then(function (result) {
            $scope.loading = false;
            window.location.href = "/activities";
        })
    }
}]);

module.exports = {
    name: "Portrait right consent",
    url: "/consent_portrait_right",
    parent: "/",
    templateUrl: "/www/pages/consentPortraitRight.html",
    controller: "portraitRightController"
};