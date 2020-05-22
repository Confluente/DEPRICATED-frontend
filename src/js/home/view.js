var app = angular.module("confluente");

app.controller("homePageController", ["$scope", "activities", function ($scope, activities) {

    $scope.loading = true;

    $scope.acts = [];

    // function for getting all activities from current date onwards from backend
    activities.getAll().then(function (activities) {
        $scope.activities = activities;

        // getting the first 3 published activities
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].published) {
                $scope.acts.push(activities[i]);
            }

            if ($scope.acts.length >= 3) {
                break;
            }
        }

        $scope.loading = false;
    });


    $('.carousel').carousel({
        interval: 8000,
        duration: 1200
    })

    //JQUERY code to enable the scroll animation triggering
    //must embed to angularjs later
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
        } else {
        $element.removeClass('in-view');
        }
    });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

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
