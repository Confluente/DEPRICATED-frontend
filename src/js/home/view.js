const app = angular.module("confluente");

app.controller("homePageController", ["$scope", "activities", function ($scope, activities) {

    $scope.loading = true;

    $scope.acts = [];

    // function for getting all activities from current date onwards from backend
    activities.getAll().then(function (activities) {
        $scope.activities = activities;

        // getting the first 3 published activities
        for (let i = 0; i < activities.length; i++) {
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
    let $animation_elements = $('.animation-element');
    let $window = $(window);

    function check_if_in_view() {
        const window_height = $window.height();
        const window_top_position = $window.scrollTop();
        const window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            let $element = $(this);
            const element_height = $element.outerHeight();
            const element_top_position = $element.offset().top;
            const element_bottom_position = (element_top_position + element_height);

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

    // initialize turn js magazine
    $("#magazine").turn({
        width: 420,
        height: 300,
        autoCenter: true
    });

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
