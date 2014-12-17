'use strict';

/**
 * @ngdoc overview
 * @name 14StructuringDataApp
 * @description
 * # 14StructuringDataApp
 *
 * Main module of the application.
 */
angular
  .module('14StructuringDataApp', [
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
  })
  .constant('FBURL', 'https://fiery-fire-8387.firebaseio.com/');
