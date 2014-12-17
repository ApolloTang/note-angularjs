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

    // And becuse "child_added" return item one at a time you will
    // have to reconstruct the collection locally because
    // ng-repeat work with collection (which we will do next)
    $scope.messages = [];

    messagesRef.on('child_added', function( snapshot ){
        // with "child_added", entire collection is fetched
        // during the first "initialize". And during this first
        // "initialize" collection items are received
        // one item at a time (in onValue it is receive as a json
        // with items nested within). After the initial fetch
        // snapshot will only return newly added item.
        //
        // [!] Remember "on" event will fire on each browser
        // that connects to firebase, if firebase return the
        // entire collection when a single item is added
        // you will get an expansive bill at the end of the month.
        //
        $timeout(function(){
            var snapshotVal = snapshot.val();
            console.log('** child_added: ', snapshotVal);
            // $scope.messages.push(snapshotVal);
            $scope.messages.push({
                  text: snapshotVal.text
                , user: snapshotVal.user
                // , name: snapshot.name()  // <-- name() is deprecated
                , name: snapshot.key()
            });
        }, 0);
    });

    messagesRef.on('child_changed', function( snapshot ){
        $timeout(function(){
            var snapshotVal = snapshot.val();
            // console.log('&& child_changed: ', snapshot.name());  // <-- name() is deprecated
            console.log('&& child_changed: ', snapshot.key());
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
