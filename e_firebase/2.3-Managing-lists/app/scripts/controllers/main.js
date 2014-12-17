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
  .controller('MainCtrl', function ($scope, $timeout) {

    var rootRef = new Firebase('https://fiery-fire-8387.firebaseio.com/');
    var messagesRef = rootRef.child('messages');

    $scope.currentUser = null;
    $scope.currentText = null;


    messagesRef.on('value', function( snapshot ){
        $timeout(function(){
            var snapshotVal = snapshot.val();
            console.log(snapshotVal);
            $scope.messages = snapshotVal;
        }, 0);
    });

    $scope.sendMessage = function(){
        var newMessage = {
            user: $scope.currentUser
            , text: $scope.currentText
        }

        messagesRef.push(newMessage);
        // when using set() you have to name your key
        // push() is different from set() in that you item is assigned a unique key
    }

  });
