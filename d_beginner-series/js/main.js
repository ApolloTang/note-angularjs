var app = angular.module("myApp", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: "templates/home.html"
        , controller: "HomeController"
    })
    .otherwise({ redirecTo: '/' });
});

app.controller('HomeController', function(){

});
