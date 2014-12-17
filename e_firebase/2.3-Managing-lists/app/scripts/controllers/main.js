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
            console.log('&& child_changed, key: ', snapshot.key());

            var message = findMessageByName(snapshot.key());
            console.log('&& child_changed, message: ', message);
            // Object {text: "dsf", user: "fdsaf", name: "-JdNzlBP8yIn7jlzw2Ef", $$hashKey: "object:3"}
            // Note the above console.log message item "$$hashkey":
                // This property is used as a key to associated
                // DOM elements with the corresponding item in
                // the array by identity. Moving the same object
                // in array would move the DOM element in the
                // same way in the DOM.
                // [ref]: https://docs.angularjs.org/api/ng/directive/ngRepeat
            var newText = snapshotVal.text;
            message.text = newText;
        }, 0);
    });

    messagesRef.on('child_removed', function( snapshot ){
        $timeout(function(){
            deleteMessageByName(snapshot.key());
        });
    });

    function deleteMessageByName(name) {
        var i=0;
        for (; i < $scope.messages.length; i++ ) {
            var currentMessage = $scope.messages[i];
            if (currentMessage.name === name) {
                $scope.messages.splice(i,1);
                break;
            }
        }
    }

    function findMessageByName(name) {
        var messageFound = null;
        var i=0;
        for (; i < $scope.messages.length; i++ ) {
            var currentMessage = $scope.messages[i];
            if (currentMessage.name === name) {
                messageFound = currentMessage;
                break;
            }
        }
        return messageFound;
    }

    $scope.sendMessage = function(){
        var newMessage = {
            user: $scope.currentUser
            , text: $scope.currentText
        };

        messagesRef.push(newMessage);
        // when using set() you have to name your key
        // push() is different from set() in that you item is assigned a unique key
    };

  });
