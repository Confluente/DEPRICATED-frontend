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
    var height = 0;

    // Magazine page size: 1039 x 1476  (width x height)
    // So the ratio is:       1 : 1.42
    // Or:                 0.70 : 1

    // Screen width: medium (md), large (lg)
    if (window_width >= 940) {
        display = "double";

        if (window_width >= window_height * 0.70 * 2) {
            width  = window_height * 0.70 * 2;
            height = window_height;
        } else {
            width  = window_width;
            height = window_width * 1.42 / 2;
        }
    }

    // Screen width: extra small (xs), small (sm)
    else {
        display = "single";

        if (window_width >= window_height * 0.70) {
            width  = window_height * 0.70;
            height = window_height;
        } else {
            width = window_width;
            height = window_width * 1.42;
        }
    }

    $("#magazine").turn({
        width: width,
        height: height,
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
