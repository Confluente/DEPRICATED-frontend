var app = angular.module("confluente");

/**
 * Controller for handling internships
 */
app.controller("internshipCreateController", ["$rootScope", "$scope", "partners", function ($rootScope, $scope, partners) {
    $scope.loading = false;

    // Different companies for which internships are supported
    $scope.companies = {
        "Optiver": "/img/partners/optiver.png",
    }

    $scope.companyNames = [];
    for (var name in $scope.companies) {
        $scope.companyNames.push(name);
    }

    // Categories that can be chosen
    $scope.categories = ["internship"]

    // function called when submit button is pushed
    $scope.submit = function() {
        $scope.loading = true;

        console.log($scope)
        console.log($scope.companies[$scope.company])

        // create group in backend
        partners.createInternship({
            title: $scope.title,
            companyName: $scope.company,
            description: $scope.description,
            imageUrl: $scope.companies[$scope.company],
            contactEmail: $scope.email,
            link: $scope.link,
            educationLevel: $scope.educationLevel,
            category: $scope.categories[0]
        }).then(function (result) {
            $scope.loading = false;

            // redirect to created internship
            // window.location.href = "/partners/internships/" + result.id;
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