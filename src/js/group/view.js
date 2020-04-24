var app = angular.module("confluente");

/**
 * Controller for viewing group
 */
app.controller("groupViewController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, group) {
    // get groupId from URL
    var groupId = $routeParams.groupId;

    function arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
    // get group from backend by groupId and set it on the $scope
    group.get(groupId).then(function (group) {
        // Sorting group on 1. chair, 2. Secretary, 3. Treasurer, 4. Members, 5. Board representative
        for (var i = 0; i < group.members.length; i++) {
            if (group.members[i].user_group.func === "Board representatitve") {
                arraymove(group.members, i, group.members.length - 1);
            }
        }
        for (var i = 0; i < group.members.length; i++) {
            if (group.members[i].user_group.func === "Treasurer") {
                arraymove(group.members, i, 0);
            }
        }
        for (var i = 0; i < group.members.length; i++) {
            if (group.members[i].user_group.func === "Secretary") {
                arraymove(group.members, i, 0);
            }
        }
        for (var i = 0; i < group.members.length; i++) {
            if (group.members[i].user_group.func === "Chair") {
                arraymove(group.members, i, 0);
            }
        }
        $scope.group = group;

    });
}]);

module.exports = {
    name: "Group",
    url: "/group/:groupId",
    parent: "/group/",
    templateUrl: "/www/templates/group/groupDetails.html",
    controller: "groupViewController"
};
