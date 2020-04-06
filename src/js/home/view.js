var app = angular.module("confluente");

app.controller("homePageController", ["$scope", "$routeParams", function ($scope, $routeParams) {
    //document.getElementById("rightCarouselButton").click();

    $('.carousel').carousel({
        interval: 8000,
        duration: 1200
    })

}]);

module.exports = {
    id: 1,
    name: "Home",
    url: "/",
    parent: null,
    templateUrl: "/www/home.html",
    iconUrl: "/img/home-outline.png",
    controller: "homePageController"
};
