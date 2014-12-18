/* global Firebase */
/* jshint undef: false, unused: false, laxcomma: true */
'use strict';

(function(angular){
    console.log('MessageService load');
    angular.module('14StructuringDataApp').service('MessageService', function(FBURL){
        var messageRef = new Firebase(FBURL).child('messages');
        var startAtPriority = null;
        var endAtPriority = null;
        return {
            childAdded: function childAdded(limitNumber, callback){
                messageRef
                    // using .startAt and .limit to give paging functionality
                    .startAt( startAtPriority, '-JdPl-jf43PH9lk77Fg5' )
                    // .endAt( endAtPriority, '-JdT-EkL4w2WSvf2q_hT' )
                    .limit(limitNumber)
                    .on('child_added', function(snapshot){
                        var val = snapshot.val();
                        callback.call(this, { user: val.user, text: val.text, name: snapshot.key() } );
                    });
            }
            , add: function addMessage(message){
                messageRef.push(message);
            }
            , off: function(){
                console.log('turnFeedOff');
                messageRef.off();
            }
        };
    });
})(window.angular);


