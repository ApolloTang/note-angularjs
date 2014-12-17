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
    var childRef = rootRef.child('message');


    childRef.on('value', function( snapshot ){
        // every time value is updated on the childRef,
        // snapshot will return a new value
        $timeout(function(){
            //@TODO  To study and figure out later
                // don't understand how this work
                // but by wrapping the code that update $scope.message inside $timeout (with delay of 0sec )
                // event from firebase can now propagate into angular
            var snapshotVal = snapshot.val();
            console.log('value from firebase: ', snapshotVal);       // this get update when firebose change
            $scope.message = snapshotVal;
        }, 0); // <--- [!] note that delay of zero second
    });

    $scope.$watch('message.text', function(newVal){
        console.log('value in text box: ', newVal);
        if (!newVal){ return; }
        childRef.update({ text: newVal });
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
