app = angular.module("confluente");

app.factory("serviceAuth", ["$rootScope", "$http", "$cookies", "$location", function ($rootScope, $http, $cookies, $location) {
    var auth = {
        user: {
            loggedIn: false,
        }
    };

    auth.login = function (email, password) {
        $http.post("/api/auth/login", {email: email, password: password}).then(function (result) {
            auth.user.loggedIn = true;
            getProfile();
            $location.path("/activities");
        });
    };

    auth.logout = function () {
        $cookies.remove("session");
        auth.user = {loggedIn: false};
        $rootScope.user = auth.user;
        $location.path("/");
    };

    if ($cookies.get("session")) {
        getProfile();
    }

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