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

    // MessageService.childAdded( 5, function(addedChild){
    //    // code from previous step in tutorial
    //    // it is replaced by watch_update bellow
    //    // still work but comment out to use watch_update bellow
    //     console.log('MessageService.childAdded: ', addedChild);
    //     $timeout(function(){
    //         $scope.messages.push(addedChild);
    //     });
    // });

    MessageService.watch_update( function(addedChild){
        console.log('MessageService.childAdded: ', addedChild);
        $scope.messages.push(addedChild);
    });

    // MessageService.loaded( function(promise){
    //     // this is the alternate solution I came up with
    //     console.log(promise)
    //     promise.then( function(data){
    //         console.log('MessageService.loaded ', data)
    //         $scope.messages = data;
    //     });
    // });

    $scope.messages = [];

    $scope.sendMessage = function(){
        var newMessage = {
            user: $scope.currentUser
            , text: $scope.currentText
        };
        //MessageService.add(newMessage);
        var promise = MessageService.add(newMessage);
        promise.then(function(data){
            console.log('data from angularFire: ', data.key());
        });
    };

    $scope.turnFeedOff = function() {
        MessageService.feedOff();
    };

    $scope.turnFeedOn = function() {
        MessageService.feedOn();
    };

    $scope.pageNext = function() {
        var lastItem = $scope.messages[$scope.messages.length - 1];
        MessageService.pageNext(lastItem.name, 10).then(function(messages){
            $scope.messages = messages;
        });
    };
    $scope.pageBack = function() {
        var firstItem = $scope.messages[0];
        MessageService.pageBack(firstItem.name, 10).then(function(messages){
            $scope.messages = messages;
        });
    };
  });
