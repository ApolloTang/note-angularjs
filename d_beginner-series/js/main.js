var app = angular.module("myApp", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: "templates/home.html"
        , controller: "HomeController"
    })
    .when('/settings', {
        templateUrl: "templates/settings.html"
        , controller: "settingController"
    })
    .otherwise({ redirecTo: '/' });
});

app.controller('HomeController', function( $scope ){

});

app.controller('settingController', function( $scope ) {
    $scope.name="apollo";
});
