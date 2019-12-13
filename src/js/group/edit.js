var app = angular.module("confluente");

app.controller("groupEditController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, groups) {
    // get groupId from URL
    var groupId = $routeParams.groupId;
    // get group from backend by groupId and set on $scope
    groups.get(groupId).then(function (group) {
        $scope.group = group;
    });

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        groups.edit($scope.group).then(function (result) {
            $scope.loading = false;
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Edit Group",
    url: "/manage/group/edit/:groupId",
    parent: "/manage/",
    templateUrl: "/www/templates/group/groupEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "groupEditController"
};
