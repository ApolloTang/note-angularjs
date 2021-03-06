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

            // what are available in snapshot ?
            console.log('hasChildren(): ', snapshot.hasChildren() );
            console.log('hasChild("text"): ', snapshot.hasChild('text') );
            console.log('hasChild("dog"): ', snapshot.hasChild('dog') );
            console.log('name: ', snapshot.name() );
            console.log('numChildren: ', snapshot.numChildren() );
            snapshot.forEach(function(item){
                console.log('iterating item: ', item);
                console.log('iterating item.name() - item.val(): ', item.name() + ' - ' + item.val() );
                console.log('iterating item.hasChildren(): ', item.hasChildren() );
                console.log('iterating item.ref(): ', item.ref() ); // https://fiery-fire-8387.firebaseio.com/message/text
                                                                    // https://fiery-fire-8387.firebaseio.com/message/user
            });

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
