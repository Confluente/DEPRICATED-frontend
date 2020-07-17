var app = angular.module("confluente");

/**
 * Controller for creating users
 */
app.controller("userCreateController", ["$scope", "users", function ($scope, user) {
    $scope.loading = false;

    // Different tracks within the honors academy
    $scope.tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility", "Master Honors"];

    // Different generations in which students can say that started at honors academy
    $scope.generations = [2016, 2017, 2018, 2019, 2020];

    // Different membership statuses
    $scope.memberships = ["Member", "Alumni", "Associate member"];

    // function called when newly created user is submitted
    $scope.submit = function () {
        $scope.loading = true;
        if (!$scope.firstName || !$scope.lastName || !$scope.password || !$scope.email || !$scope.membership) {
            $scope.loading = false;
            return alert("Not all required fields were filled in!");
        }

        if (!$scope.email.endsWith("@student.tue.nl")) {
            $scope.loading = false;
            return alert("You did not enter a valid TU/e email!");
        }

        // create new user in backend based on $scope variables as set in form
        user.create({
            displayName: $scope.firstName + " " + $scope.lastName,
            email: $scope.email,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            honorsMembership: $scope.membership,
            major: $scope.major,
            address: $scope.address,
            dateOfBirth: $scope.dateOfBirth,
            track: $scope.honorsTrack,
            honorsGeneration: $scope.generation,
            campusCardNumber: $scope.cardNumber,
            mobilePhoneNumber: $scope.phone,
            password: $scope.password,
            consentWithPortraitRight: $scope.portraitRight
        }).then(function (result) {
            $scope.loading = false;

            if (result.error === 406) return alert(result.data);

            // redirect to '/manage'
            window.location.href = "/submitted_registration";
        });
    };
}]);

module.exports = {
    name: "New User",
    url: "/registerForTheNewAwesomeWebsite",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userCreate.html",
    controller: "userCreateController"
};
