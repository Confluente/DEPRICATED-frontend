var app = angular.module("confluente");

/**
 * Controller for handling deletion of internships
 */
app.controller("internshipDeleteController", ["$scope", "$routeParams", "partners", function ($scope, $routeParams, partners) {
    $scope.loading = false;

    // Get the id of the internship
    var internshipId = $routeParams.internshipId;

    // Get the internship from the database
    partners.getInternship(internshipId).then(function (internship) {
        $scope.internship = internship;
    })

    $scope.delete = function () {
        $scope.loading = true;

        // Delete the internship
        partners.deleteInternship(internshipId).then(function (result) {
            $scope.loading = false;

            // redirect to edited internship
            window.location.href = "/manage";
        })
    }

}]);

module.exports = {
    name: "Delete internship",
    url: "/manage/partners/internships/delete/:internshipId",
    parent: "/partners/sponsors",
    templateUrl: "/www/templates/partners/internships/delete.html",
    controller: "internshipDeleteController"
};