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
    $scope.settings={
        name: 'some default name'
        , email: 'some@default.email.com'
    };
    $scope.updateSettings = function(){
        console.log('updateSettings was called');
    }
});
