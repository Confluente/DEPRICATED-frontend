app = angular.module("confluente");

/**
 * Factory for authentication
 */
app.factory("serviceAuth", ["$rootScope", "$http", "$cookies", "$location", function ($rootScope, $http, $cookies, $location) {
    // variable containing user details
    var auth = {
        user: {
            loggedIn: false,
        }
    };

    /**
     * Function for attempting logging in backend, based on email and password
     * @param email
     * @param password
     */
    auth.login = function (email, password) {
        $http.post("/api/auth/login", {email: email, password: password}).then(function (result) {
            auth.user.loggedIn = true;
            getProfile();
            // redirect to activities
            $location.path("/activities");
        }, function (err) {
            alert(err.data.data);
        });
    };

    /**
     * Function for logging out in backend & locally
     */
    auth.logout = function () {
        $cookies.remove("session");
        auth.user = {loggedIn: false};
        $rootScope.user = auth.user;
        // redirect to homepage
        $location.path("/");
    };

    // todo add comment if understood
    if ($cookies.get("session")) {
        getProfile();
    }

    /**
     * Function for getting profile from backend and store on $rootScope
     */
    function getProfile() {
        $http.get("/api/auth/").then(function (result) {
            auth.user = result.data;
            auth.user.loggedIn = true;
            $rootScope.user = auth.user;
        });
    }

    $rootScope.user = auth.user;
    return auth;
}]);