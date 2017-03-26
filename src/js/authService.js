app = angular.module("confluente");

app.factory("authService", ["$rootScope", "$http", "$cookies", function ($rootScope, $http, $cookies) {
  var auth = {
    user: {
      displayName: "Henk",
      loggedIn: false,
    }
  };

  auth.login = function (email, password) {
    $http.post("/api/user/login", {email: email, password: password}).then(function (result) {
      console.log(result.data);
      auth.user.loggedIn = true;
    });
  };

  auth.logout = function () {
    $cookies.remove("session");
    auth.user.loggedIn = false;
  };

  if ($cookies.get("session")) {
    $http.get("/api/user/").then(function (result) {
      console.log(result.data);
      auth.user = result.data;
      auth.user.loggedIn = true;
      $rootScope.user = auth.user;
    });
  }
  $rootScope.user = auth.user;
  return auth;
}]);
