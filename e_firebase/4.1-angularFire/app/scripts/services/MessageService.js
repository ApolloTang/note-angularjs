/* global Firebase */
/* jshint undef: false, unused: false, laxcomma: true */
'use strict';

(function(angular){
    console.log('MessageService load');
    angular.module('14StructuringDataApp')
        .service('MessageService', function(FBURL, $q, $firebase){ // <--- inject firebase
            var messageRef = new Firebase(FBURL).child('messages');
            var fireMessage = $firebase(messageRef)
                                .$asArray();  // <--- missing in tutorial !!
               //see: https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-addnewdata

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

                // childAdded: function childAdded(limitNumber, callback){
                //     // This is tutorial's code it is no longer working after version 0.8.0
                //     messageRef
                //         // .startAt()
                //         // .limit(limitNumber)
                //         .$on('child_added', function(data){
                //             console.log(data)
                //             var val = data.snapshot.value;
                //             callback.call(this, {
                //                   user: val.user
                //                 , text: val.text
                //                 , name: data.snapshot.name
                //             });
                //         });
                // }

                , watch_update: function childAdded(callback){
                    // it turns out that $on has been deprecated
                    //
                    //  [Ref]: https://www.firebase.com/docs/web/libraries/angular/changelog.html
                    //      Jul 30, 2014 - Version 0.8.0
                    //
                    //      $on() and $off() no longer exist. Similar functionality can be obtained with $watch()
                    //      but should be discouraged for trying to manually manage server events (manipulation
                    //      should be done with data transformations through $extendFactory() instead).
                    //
                    console.log('childAdded cAlled');
                    fireMessage.$watch(function(e) {
                        if (e.event === 'child_added') {
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
                                itemVal.name = snapItem.key();
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
                                itemVal.name = snapItem.key();
                                messages.push(itemVal);
                            });
                            deferred.resolve(messages);
                        });
                    return deferred.promise;
                }
            };
        });
})(window.angular);


