const app = angular.module("confluente");

app.controller("groupEditController", ["$scope", "$routeParams", "groups", "users", function ($scope, $routeParams, groups, users) {
    // get groupId from URL
    var groupId = $routeParams.groupId;

    // Different roles in a committee
    $scope.groupRoles = ["Member", "Chair", "Secretary", "Treasurer", "Board representative"];

    $scope.user_group = [];

    $scope.users_not_in_group = [];

    // get group from backend by groupId and set on $scope
    groups.get(groupId).then(function (group) {
        $scope.group = group;
        var ids_in_group = [];
        for (var i = 0; i < group.members.length; i++) {
            $scope.user_group.push({name: group.members[i].displayName, func: group.members[i].user_group.func, id: group.members[i].user_group.userId});
            ids_in_group.push(group.members[i].user_group.userId);
        }

        users.getAll().then(function (users) {
            $scope.users = users;
            for (var i = 0; i < users.length; i++) {
                if (!ids_in_group.includes(users[i].id)) {
                    $scope.users_not_in_group.push({name: users[i].displayName, id: users[i].id})
                }
            }
        });
    });

    function compare(user_object_1, user_object_2) {
        if (user_object_1.name < user_object_2.name) {
            return -1
        } else {
            return 1
        }
    }

    $scope.addUserToGroup = function(user, index) {
        $scope.user_group.push({name: user.name, func: "Member", id: user.id});
        $scope.users_not_in_group.splice(index, 1);
        $scope.user_group.sort(compare);
        $scope.users_not_in_group.sort(compare);
    };

    $scope.removeUserFromGroup = function(user, index) {
        $scope.users_not_in_group.push({name: user.name, id: user.id});
        $scope.user_group.splice(index, 1);
        $scope.users_not_in_group.sort(compare);
        $scope.user_group.sort(compare);
    };

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        groups.edit($scope.group, $scope.user_group).then(function (result) {
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
