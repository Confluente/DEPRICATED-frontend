const app = angular.module("confluente");

/* Load all committees from the database and pass them to the template. */
app.controller("committeesController", ["$scope", "groups", function ($scope, groups) {

    $scope.loading = true;

    /* Grab all the Committees from the database */
    groups.getAllOfType("Committee").then(function(committees) {

        /* Bind home page and the image to the committee template */
        committees.forEach(function(committee) {
            committee.link = "/group/" + committee.id.toString();
            /* Image is under src/img/CommitteePictures/Committee_Name.jpg */
            committee.image = "/img/CommitteePictures/" + committee.displayName.replace(/ /g, "_").toLowerCase() + ".jpg";
        });

        /* Bind committees to scope */
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