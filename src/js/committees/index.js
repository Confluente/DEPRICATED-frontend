var app = angular.module("confluente");

app.controller("committeesController", ["$scope", "groups", function ($scope, groups) {

    $scope.loading = true;

    /* Load all committees from the database and pass them to the template. */
    groups.getAllOfType("committee").then(function(committees) {

        committees.forEach(function(comm) {
            // comm.link = "/groups/" + comm.id.toString();
            comm.image = "/img/CommitteePictures/" + comm.displayName.replace(/ /g, "_").toLowerCase() + ".jpg";
        });

        $scope.committees = committees;
        $scope.loading = false;
    });

}]);

module.exports = {
    name: "Committees",
    url: "/about/committees",
    parent: "/about",
    templateUrl: "/www/templates/committees/committees.html",
    iconUrl: "/img/home-outline.png",
    controller: "committeesController"
};