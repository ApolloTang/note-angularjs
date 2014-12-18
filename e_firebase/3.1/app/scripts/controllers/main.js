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
  .controller('MainCtrl', function ($scope, $timeout, MessageService) {

        // var rootRef = new Firebase('https://fiery-fire-8387.firebaseio.com/');

    $scope.currentUser = null;
    $scope.currentText = null;

    MessageService.childAdded(function(addedChild){
        console.log('MessageService.childAdded: ', addedChild);
        $timeout(function(){
            $scope.messages.push(addedChild);
        });
    });

    $scope.messages = [];

    $scope.sendMessage = function(){
        var newMessage = {
            user: $scope.currentUser
            , text: $scope.currentText
        };
        MessageService.add(newMessage);
    };

    $scope.turnFeedOff = function() {
        MessageService.off();
    };

  });
