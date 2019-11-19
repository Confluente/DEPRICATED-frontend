var app = angular.module("confluente");
app.controller("groupCreateController", ["$scope", "groups", function ($scope, groups) {
    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        groups.create({
            displayName: $scope.name,
            fullName: $scope.name,
            description: $scope.description,
            email: $scope.email,
            canOrganize: $scope.canOrganize
        }).then(function (result) {
            $scope.loading = false;
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
