const app = angular.module("confluente");

/**
 * Controller for editing user
 */
app.controller("userEditController", ["$scope", "$q", "$routeParams", "users", "groups", function ($scope, $q, $routeParams, user, groups) {
    // get userId from URL
    const userId = $routeParams.userId;

    // Different tracks within the honors academy
    $scope.tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility", "Master Honors"];

    // Different roles in a committee
    $scope.groupRoles = ["Member", "Chair", "Secretary", "Treasurer", "Board representative"];

    // Different generations in which students can say that started at honors academy
    $scope.generations = [2016, 2017, 2018, 2019, 2020];

    // Different roles for users
    $scope.role = {
        roles: [{
            id: "User"
        }, {
            id: "Admin"
        }]
    };

    $scope.selectedRole = {
        id: "User"
    };

    $q.all([
        // retrieve all groups from backend
        groups.getAll().then(function (groups) {
            $scope.groups = groups;
        }),
        // retrieve user from backend by userId
        user.get(userId).then(function (param) {
            $scope.user = param[0];
            if ($scope.user.isAdmin) $scope.selectedRole.id = "Admin";
            $scope.member = param[1];
        })
    ]).then(function () {
        let member_groups = [];

        // get indices of groups of which user is member
        for (let i = 0; i < $scope.member.length; i++) {
            member_groups.push($scope.member[i].id);
        }

        // Function to find the user_group of one of the groups that the user is a member of
        var findMemberGroup = function (id) {
            for (let j = 0; j < $scope.member.length; j++) {
                if ($scope.member[j].id === id) {
                    return $scope.member[j];
                }
            }
            assert(false) // this can't/shouldn't happen happen
        };

        // get attributes of groups of which user is member
        $scope.groupSelection = [];
        for (let i = 0; i < $scope.groups.length; i++) {
            if (member_groups.includes($scope.groups[i].id)) {
                $scope.groupSelection.push({
                    fullName: $scope.groups[i].fullName,
                    id: $scope.groups[i].id,
                    selected: true,
                    role: findMemberGroup($scope.groups[i].id).members[0].user_group.func
                })
            } else {
                $scope.groupSelection.push({
                    fullName: $scope.groups[i].fullName,
                    id: $scope.groups[i].id,
                    selected: false,
                    role: "Member"
                })
            }
        }

        // Helper method
        $scope.selectedGroups = function selectedGroups() {
            return filterFilter($scope.groupSelection, {selected: true});
        };

        $scope.loading = false;
        // function called when edit of user is submitted
        $scope.submit = function () {
            if (!$scope.user.firstName || !$scope.user.lastName || !$scope.user.email) {
                $scope.loading = false;
                return alert("Not all required fields were filled in!");
            }

            $scope.user.isAdmin = $scope.selectedRole.id === "Admin";
            $scope.user.displayName = $scope.user.firstName + " " + $scope.user.lastName;
            $scope.loading = true;
            user.edit($scope.user, $scope.groupSelection).then(function (result) {
                $scope.loading = false;
                // redirect to '/manage'
                window.location.href = "/manage";
            });
        };

    })
}]);

module.exports = {
    name: "Edit User",
    url: "/manage/user/edit/:userId",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "userEditController"
};