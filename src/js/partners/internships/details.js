var app = angular.module("confluente");

var showdown = require('showdown');

/**
 * Controller for handling viewing one internship
 */
app.controller("internshipDetailsController", ["$scope", "$routeParams", "partners",
        function ($scope, $routeParams, partners) {
    $scope.loading = false;

    // Get the id of the internship
    var internshipId = $routeParams.internshipId;

    // Get the internship from the database
    partners.getInternship(internshipId).then(function (internship) {
        $scope.internship = internship;

        // Get the current user
        $scope.user = $scope.$parent.user;

        // Check if the user is a member of the acquisition committee
        for (var i = 0; i < $scope.user.groups.length; i++) {
            if ($scope.user.groups[i].email === "acquisition@hsaconfluente.nl") {
                $scope.isUserInAcquisition = true;
            }
        }

        // Convert the internship to markdown html
        var converter = new showdown.Converter()
        $scope.html_desc = converter.makeHtml(internship.description);
    });
}]);

module.exports = {
    name: "Internships",
    url: "/partners/internships/:internshipId",
    parent: "/partners/sponsors",
    templateUrl: "/www/templates/partners/internships/details.html",
    controller: "internshipDetailsController"
};