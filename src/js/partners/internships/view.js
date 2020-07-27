var app = angular.module("confluente");

/**
 * Controller for handling internships
 */
app.controller("internshipController", ["$rootScope", "$scope", "partners", "users", function ($rootScope, $scope, partners, users) {
    $scope.loading = false;

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