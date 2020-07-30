var app = angular.module("confluente");

/**
 * Controller for handling editing of internships
 */
app.controller("internshipEditController", ["$scope", "$routeParams", "partners", "users", function ($scope, $routeParams, partners, users) {
    $scope.loading = false;

    // Different companies for which internships are supported
    $scope.companies = ["Optiver"]

    // Categories that can be chosen
    $scope.categories = ["internship"]

    var internshipId = $routeParams.internshipId;

    partners.getInternship(internshipId).then(function (internship) {
        $scope.internship = internship;
    })

    $scope.submit = function () {
        $scope.loading = true;

        $scope.internship.category = $scope.categories[0];

        partners.editInternship($scope.internship).then(function (result) {
            $scope.loading = false;

            // redirect to edited internship
            window.location.href = "/partners/internships/" + result.id;
        })
    }

}]);

module.exports = {
    name: "Internships",
    url: "/manage/partners/internships/edit/:internshipId",
    parent: "/partners/sponsors",
    templateUrl: "/www/templates/partners/internships/edit.html",
    controller: "internshipEditController"
};