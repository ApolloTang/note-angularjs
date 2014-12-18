/* global Firebase */
/* jshint undef: false, unused: false, laxcomma: true */
'use strict';

(function(angular){
    console.log('MessageService load');
    angular.module('14StructuringDataApp').service('MessageService', function(FBURL){
        var messageRef = new Firebase(FBURL).child('messages');
        return {
            childAdded: function childAdded(callback){
                messageRef.on('child_added', function(snapshot){
                    var val = snapshot.val();
                    callback.call(this, { user: val.user, text: val.text, name: snapshot.key() } );
                });
            }
            , add: function addMessage(message){
                messageRef.push(message);
            }
        };
    });
})(window.angular);


