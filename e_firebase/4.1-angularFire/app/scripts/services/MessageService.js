/* global Firebase */
/* jshint undef: false, unused: false, laxcomma: true */
'use strict';

(function(angular){
    console.log('MessageService load');
    angular.module('14StructuringDataApp')
        .service('MessageService', function(/*FBURL, */ MSGURL,  $q, $firebase){ //<--- change constant

            var messageRef = new Firebase(MSGURL).limitToFirst(3);

            var fireMessage = $firebase(messageRef).$asArray();

            var _subscribeToFeed = true;

            return {
                childAdded: function childAdded(limitNumber, callback){
                    // code from previous step in tutorial
                    // it is replaced by watch_update bellow
                    messageRef
                        .startAt()
                        .limit(limitNumber)
                        .on('child_added', function(snapshot){
                            var val = snapshot.val();
                            callback.call(this, {
                                user: val.user
                                , text: val.text
                                , name: snapshot.key()
                            });
                        });
                }

                , watch_update: function childAdded(callback){
                    console.log('childAdded cAlled');
                    fireMessage.$watch(function(e) {
                        if (e.event === 'child_added' && _subscribeToFeed ) {
                            var key = e.key;
                            var record = fireMessage.$getRecord(key);
                            callback.call(this, { user: record.user, text: record.text, name: key } );
                        }
                    });
                }

                    // , loaded: function (callback) {
                    //     // this is the alternate solution I came up with
                    //      var promise = fireMessage.$loaded();
                    //      callback.call(this, promise);
                    // }

                , add: function addMessage(message){
                    // messageRef.push(message);
                    var promise = fireMessage.$add(message);
                    return promise;
                    // v4.2--00:39
                    // $add is different from push. In addition to executing a push,
                    // it assigns an unique key and $add return the unique key
                    // as a promise.
                }

                , feedOff: function(){
                     console.log('turn feed off');
                     _subscribeToFeed = false;
                }
                , feedOn: function(){
                     console.log('turn feed on');
                     _subscribeToFeed = true;
                }

                , pageNext: function(previousLast, numberOfItems){
                    // var deferred = $q.defer();
                    // var messages = [];

                    // var pageMessageRef = new Firebase(FBURL).child('messages');
                    var pageMessageRef = new Firebase(MSGURL)
                                                .startAt(null, previousLast)
                                                .limit( numberOfItems );

                    var pageFireMessage = $firebase( pageMessageRef ).$asArray();

                    var promise = pageFireMessage.$loaded();
                    return promise;

                    // messageRef
                    //     // .startAt(null, name)
                    //     // .limit( numberOfItems )
                    //     .once( 'value', function(snapshot){
                    //         snapshot.forEach(function(snapItem){
                    //             var itemVal = snapItem.val();
                    //             itemVal.name = snapItem.key();
                    //             messages.push(itemVal);
                    //         });
                    //         deferred.resolve(messages);
                    //     });
                    // return deferred.promise;
                }

                , pageBack: function(previousFirst, numberOfItems){
                    // var deferred = $q.defer();
                    // var messages = [];

                    var pageMessageRef = new Firebase(MSGURL)
                                            .endAt(null, previousFirst)
                                                .limit( numberOfItems );
                    var pageFireMessage = $firebase( pageMessageRef ).$asArray();

                    var promise = pageFireMessage.$loaded();
                    return promise;

                    // messageRef.endAt(null, name)
                    //     .limit( numberOfItems )
                    //     .once( 'value', function(snapshot){
                    //         snapshot.forEach(function(snapItem){
                    //             var itemVal = snapItem.val();
                    //             itemVal.name = snapItem.key();
                    //             messages.push(itemVal);
                    //         });
                    //         deferred.resolve(messages);
                    //     });
                    // return deferred.promise;
                }
            };
        });
})(window.angular);


