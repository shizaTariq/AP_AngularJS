'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');
  var servcies = null;





servcies.factory('pouchdb', function() {
  Pouch.enableAllDbs = true;
  return new Pouch('myApp');
});


servcies.factory('pp', function($q, pouchdb, $rootScope) {

  return {
    add: function(userID) {
      var deferred = $q.defer();
      var doc = {
        type: 'user',
        userId: userId,
        userEmail: userEmail,
        userPassword: userPassword
      };
      pouchdb.post(doc, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(res)
          }
        });
      });
      return deferred.promise;
    },
    getUser: function(userId) {
      var deferred = $q.defer();
      var map = function(vara) {
        if (vara.type === 'user') {
          emit(vara.userId, null)
        }
      };

      pouchdb.query({map: map, reduce: '_count'}, {key: usersId}, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            if (!res.rows.length) {
              deferred.resolve(0);
            } else {
              deferred.resolve(res.rows[0].value);
            }
          }
        });
      });
      return deferred.promise;
    },

    pushToRemoteCouch: function() {
    	pouchdb.replicate.to('http://shiza.iriscouch.com');
    }
  }

});
