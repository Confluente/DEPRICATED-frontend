var app = angular.module("confluente");

/**
 * Controller for handling internships
 */
app.controller("internshipCreateController", ["$rootScope", "$scope", "partners", "users", function ($rootScope, $scope, partners, users) {
    $scope.loading = false;

    // function called when submit button is pushed
    $scope.submit = function() {
        $scope.loading = true;

        // create group in backend
        partners.createInternship({
            title: $scope.title,
            companyName: $scope.company,
            description: $scope.description,
            imageUrl: "", // TODO IMPLEMENT THIS
            contactEmail: $scope.email,
            link: $scope.link,
            educationLevel: $scope.educationLevel,
            category: $scope.category
        }).then(function (result) {
            $scope.loading = false;

            // redirect to created internship
            window.location.href = "/partners/internships/" + result.id;
        })
    }
}]);

module.exports = {
    name: "Internships",
    url: "/manage/partners/internships/create",
    parent: "/partners/sponsors",
    templateUrl: "/www/templates/partners/internships/create.html",
    controller: "internshipCreateController"
};