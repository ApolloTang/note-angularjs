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
        // var messagesRef = rootRef.child('messages');
        // var titleRef = rootRef.child('title');

        // $scope.title = null;
    $scope.currentUser = null;
    $scope.currentText = null;

        // titleRef.once('value', function(snapshot){
        //     $timeout(function(){
        //         $scope.title = snapshot.val();
        //         console.log('value changed');
        //     });
        // });

    MessageService.childAdded(function(addedChild){
        console.log('MessageService.childAdded: ', addedChild);
        $timeout(function(){
            $scope.messages.push(addedChild);
        });
    });

    $scope.messages = [];

        // messagesRef.on('child_changed', function( snapshot ){
        //     $timeout(function(){
        //         var snapshotVal = snapshot.val();
        //         var message = findMessageByName(snapshot.key());
        //         var newText = snapshotVal.text;
        //         message.text = newText;
        //     }, 0);
        // });
        //
        // messagesRef.on('child_removed', function( snapshot ){
        //     $timeout(function(){
        //         deleteMessageByName(snapshot.key());
        //     });
        // });
        //
        // function deleteMessageByName(name) {
        //     var i=0;
        //     for (; i < $scope.messages.length; i++ ) {
        //         var currentMessage = $scope.messages[i];
        //         if (currentMessage.name === name) {
        //             $scope.messages.splice(i,1);
        //             break;
        //         }
        //     }
        // }
        //
        // function findMessageByName(name) {
        //     var messageFound = null;
        //     var i=0;
        //     for (; i < $scope.messages.length; i++ ) {
        //         var currentMessage = $scope.messages[i];
        //         if (currentMessage.name === name) {
        //             messageFound = currentMessage;
        //             break;
        //         }
        //     }
        //     return messageFound;
        // }

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
