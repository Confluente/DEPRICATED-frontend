var app = angular.module("confluente");

/**
 * Controller for creating users
 */
app.controller("userCreateController", ["$scope", "users", function ($scope, user) {
    $scope.loading = false;
    // function called when newly created user is submitted
    $scope.submit = function () {
        $scope.loading = true;
        // create new user in backend based on $scope variables as set in form
        user.create({
            displayName: $scope.name,
            email: $scope.email,
            password: $scope.password,
            isAdmin: false // default not admin
        }).then(function (result) {
                $scope.loading = false;
                // redirect to '/manage'
                window.location.href = "/manage";
            });
    };
}]);

module.exports = {
    name: "New User",
    url: "/manage/user/create",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userCreate.html",
    controller: "userCreateController"
};
