var app = angular.module("confluente");

var showdown = require('showdown');

/**
 * Controller for handling internships
 */
app.controller("internshipDetailsController", ["$scope", "$routeParams", "partners",
        function ($scope, $routeParams, partners) {
    $scope.loading = false;

    var internshipId = $routeParams.internshipId;

    partners.getInternship(internshipId).then(function (internship) {
        $scope.internship = internship;

        $scope.user = $scope.$parent.user;

        for (var i = 0; i < $scope.user.groups.length; i++) {
            if ($scope.user.groups[i].email === "acquisition@hsaconfluente.nl") {
                $scope.isUserInAcquisition = true;
            }
        }

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