var app = angular.module("confluente");

/**
 * Controller for handling viewing internships
 */
app.controller("internshipController", ["$rootScope", "$scope", "partners", function ($rootScope, $scope, partners) {
    $scope.loading = false;

    // Get internships from the database
    partners.getInternships().then(function (internships) {
        $scope.internships = internships;
    });
}]);

module.exports = {
    name: "Internships",
    url: "/partners/internships",
    parent: "/partners/sponsors",
    templateUrl: "/www/templates/partners/internships/view.html",
    controller: "internshipController"
};