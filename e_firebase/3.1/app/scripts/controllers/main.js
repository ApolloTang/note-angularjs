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

        // "new" key word should be avoided in the controller.
        // it is not a good practice to instantiate a class in the controller like above.
        // If you are using the "new" keyword, you are creating
        // an object that should be dependency, and any dependency in the controller
        // need to be injected. (video 3.1 7:30 )


    $scope.currentUser = null;
    $scope.currentText = null;

    MessageService.childAdded( 5, function(addedChild){
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

    $scope.pageNext = function() {
        var lastItem = $scope.messages[$scope.messages.length - 1];
        MessageService.pageNext(lastItem.name, 10).then(function(messages){
            console.log(messages);
            $scope.messages = messages;
        })
    };
  });
