/* global Firebase */
/* jshint undef: false, unused: false, laxcomma: true */
'use strict';

(function(angular){
    console.log('MessageService load');
    angular.module('14StructuringDataApp')
        .service('MessageService', function(FBURL, $q){ // <--- inject diferr functionality via $q
            var messageRef = new Firebase(FBURL).child('messages');
            return {
                childAdded: function childAdded(limitNumber, callback){
                    messageRef
                        .startAt()
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
                , pageNext: function(name, numberOfItems){
                    var deferred = $q.defer();
                    var messages = [];
                    messageRef.startAt(null, name)
                        .limit( numberOfItems )
                        .once( 'value', function(snapshot){
                            snapshot.forEach(function(snapItem){
                                var itemVal = snapItem.val();
                                itemVal.name = snapItem.key()
                                messages.push(itemVal);
                            });
                            deferred.resolve(messages);
                        });
                    return deferred.promise;
                }
                , pageBack: function(name, numberOfItems){
                    var deferred = $q.defer();
                    var messages = [];
                    messageRef.endAt(null, name)
                        .limit( numberOfItems )
                        .once( 'value', function(snapshot){
                            snapshot.forEach(function(snapItem){
                                var itemVal = snapItem.val();
                                itemVal.name = snapItem.key()
                                messages.push(itemVal);
                            });
                            deferred.resolve(messages);
                        });
                    return deferred.promise;
                }
            };
        });
})(window.angular);


