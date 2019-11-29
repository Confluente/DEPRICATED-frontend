var app = angular.module("confluente");

app.factory('responseObserver', ['$q', '$location', function responseObserver($q, $location) {
    return {
        responseError: function (errorResponse) {
            switch (errorResponse.status) {
                case 403:
                    $location.path("/403");
                    break;
                case 404:
                    $location.path("/404");
                    break;
            }
            return $q.reject(errorResponse);
        }
    };
}]);