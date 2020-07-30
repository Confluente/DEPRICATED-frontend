const app = angular.module("confluente");

/**
 * Controller for deleting users
 */
app.controller("userDeleteController", ["$scope", "$routeParams", "users", function ($scope, $routeParams, user) {
    // get userId from URL
    const userId = $routeParams.userId;
    // retrieve user from backend by userId and set on $scope
    user.get(userId).then(function (param) {
        $scope.user = param[0];
    });

    $scope.loading = false;
    // function called when deleting of user is confirmed
    $scope.submit = function () {
        $scope.loading = true;
        user.delete($scope.user).then(function () {
            $scope.loading = false;

            // redirect to '/manage'
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Delete User",
    url: "/manage/user/delete/:userId",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userDelete.html",
    iconUrl: "/img/home-outline.png",
    controller: "userDeleteController"
};
