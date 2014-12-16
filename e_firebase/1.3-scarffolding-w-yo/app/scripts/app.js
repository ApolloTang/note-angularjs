'use strict';

/**
 * @ngdoc overview
 * @name 13ScarffoldingWyoApp
 * @description
 * # 13ScarffoldingWyoApp
 *
 * Main module of the application.
 */
angular
  .module('13ScarffoldingWyoApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
