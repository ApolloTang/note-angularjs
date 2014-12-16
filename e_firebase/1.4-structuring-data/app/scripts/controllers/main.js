/* global Firebase */
/* jshint undef: false, unused: false, laxcomma: true */
'use strict';

/**
 * @ngdoc function
 * @name 14StructuringDataApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the 14StructuringDataApp
 */
angular.module('14StructuringDataApp')
  .controller('MainCtrl', function ($scope) {

    var rootRef = new Firebase('https://fiery-fire-8387.firebaseio.com/');

    // https://fiery-fire-8387.firebaseio.com/message
    $scope.setMessage = function(){
        rootRef.child('message').set({
            user: 'Bob'
            , text: 'Hi'
        });
    };
  });
