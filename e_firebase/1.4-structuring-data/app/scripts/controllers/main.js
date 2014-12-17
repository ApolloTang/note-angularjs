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
    var childRef = rootRef.child('message');

    childRef.on('value', function( snapshot ){
        // every time value is updated on the childRef, snapshot will return a new value
        $scope.message = snapshot.val();
    });



    // https://fiery-fire-8387.firebaseio.com/message
    $scope.setMessage = function(){
        childRef.set({
            user: 'Bob'
            , text: 'Hi'
        });
    };

    $scope.updateMessage = function(){
        childRef.update({
            text: 'Bye'
        });
    };

    $scope.deleteMessage = function(){
        childRef.remove();
    };

  });
