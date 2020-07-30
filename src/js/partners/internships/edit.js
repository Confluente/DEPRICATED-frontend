var app = angular.module("confluente");

/**
 * Controller for handling editing of internships
 */
app.controller("internshipEditController", ["$scope", "$routeParams", "partners", function ($scope, $routeParams, partners) {
    $scope.loading = false;

    // Get the id of the internship
    var internshipId = $routeParams.internshipId;

    // Different companies for which internships are supported
    $scope.companies = {
        "Optiver": "/img/partners/optiver.png",
    }

    // Automatically created list of all names of companies.
    $scope.companyNames = [];
    for (var name in $scope.companies) {
        $scope.companyNames.push(name);
    }

    // Categories that can be chosen
    $scope.categories = ["internship"]

    // Get intership from the database
    partners.getInternship(internshipId).then(function (internship) {
        $scope.internship = internship;
    })

    $scope.submit = function () {
        $scope.loading = true;

        // Set the correct attributes
        $scope.internship.category = $scope.categories[0];
        $scope.internship.imageUrl = $scope.companies[$scope.internship.company]

        // Edit the internship in the database
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