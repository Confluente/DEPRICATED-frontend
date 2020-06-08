var app = angular.module("confluente");

/**
 * Controller for the magazine
 */
app.controller("magazineController", ["$scope", function ($scope) {
    // after coming from homepage, page is scrolled down (bug?)
    // therefore, scroll to top at start
    window.scrollTo(0, 0);

    var window_width = $("#magazine").parent().width();
    var window_height = $("#magazine").parent().height();
    var display = "";
    var width = 0;

    if (window_width >= 940) {
        display = "double";
        width = window_height * 1.4;
    } else {
        display = "single";
        width = window_height * 0.7;
    }

    $("#magazine").turn({
        width: width,
        height: window_height,
        autoCenter: false,
        display: display,
        acceleration: false
    });

}]);

module.exports = {
    name: "Context Magazine",
    url: "/magazine",
    parent: "/",
    templateUrl: "/www/pages/magazine.html",
    controller: "magazineController"
};
