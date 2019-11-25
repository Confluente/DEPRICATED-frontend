var app = angular.module("confluente");

app.controller("userViewController", ["$scope", "$routeParams", "users", function ($scope, $routeParams, user) {
    var userId = $routeParams.userId;
    // console.log(userId);
    user.get(userId).then(function (param) {
        $scope.user = param[0];
        $scope.groups = param[1];
    });
}]);

module.exports = {
    name: "User",
    url: "/user/:userId",
    parent: "/user/",
    templateUrl: "/www/templates/user/userDetails.html",
    controller: "userViewController"
};
