var app = angular.module("confluente");

/**
 * Controller for creating group
 */
app.controller("groupCreateController", ["$scope", "groups", function ($scope, groups) {
    $scope.loading = false;
    // function called when group is created
    $scope.submit = function () {
        $scope.loading = true;
        // create group in backend using the variables as set on the $scope
        groups.create({
            displayName: $scope.name,
            fullName: $scope.name,
            description: $scope.description,
            email: $scope.email,
            canOrganize: $scope.canOrganize
        }).then(function (result) {
            $scope.loading = false;
            // redirect to created group
            window.location.href = "/group/" + result.id;
        });
    };
}]);

module.exports = {
    name: "New Group",
    url: "/manage/group/create",
    parent: "/manage/group/",
    templateUrl: "/www/templates/group/groupCreate.html",
    controller: "groupCreateController"
};
