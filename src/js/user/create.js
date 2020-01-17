var app = angular.module("confluente");

/**
 * Controller for creating users
 */
app.controller("userCreateController", ["$scope", "users", function ($scope, user) {
    $scope.loading = false;
    $scope.tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility"];

    $scope.generations = ["2018", "2019"];
    // function called when newly created user is submitted
    $scope.submit = function () {
        $scope.loading = true;
        if (!$scope.firstName || !$scope.lastName || !$scope.password || !$scope.email || !$scope.portraitRight) {
            $scope.loading = false;
            return alert("Not all required fields were filled in!");
        }

        if (!$scope.email.endsWith("@student.tue.nl")) {
            $scope.loading = false;
            return alert("You did not enter a valid TU/e email!");
        }

        // create new user in backend based on $scope variables as set in form
        console.log($scope);
        user.create({
            displayName: $scope.firstName + " " + $scope.lastName,
            email: $scope.email,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            major: $scope.major,
            track: $scope.honorsTrack,
            honorsGeneration: $scope.generation,
            campusCardNumber: $scope.cardNumber,
            mobilePhoneNumber: $scope.phone,
            password: $scope.password,
            consentWithPortraitRight: $scope.portraitRight
        }).then(function (result) {
            $scope.loading = false;
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
