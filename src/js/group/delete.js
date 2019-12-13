var app = angular.module("confluente");

/**
 * Controller for deleting groups
 */
app.controller("groupDeleteController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, group) {
    // get groupId from URL
    var groupId = $routeParams.groupId;
    // get group from backend by groupId and set on $scope
    group.get(groupId).then(function (group) {
        $scope.group = group;
    });

    $scope.loading = false;
    // function called when deleting of group is confirmed
    $scope.submit = function () {
        $scope.loading = true;
        // delete group in backend
        group.delete($scope.group).then(function () {
            $scope.loading = false;
            // redirect to '/manage'
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Delete Group",
    url: "/manage/group/delete/:groupId",
    parent: "/manage/",
    templateUrl: "/www/templates/group/groupDelete.html",
    iconUrl: "/img/home-outline.png",
    controller: "groupDeleteController"
};
