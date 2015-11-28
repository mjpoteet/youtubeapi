'use strict';
/*global angular*/
function YoutubeService($http, $q, $rootScope, localStorageService) {
  'ngInject';
  
  const baseUrl = 'https://www.googleapis.com/youtube/v3/';
  const service = {};
  const numOfResults = 10;
  
  //localStorageService.clearAll();

  var setParams = function(extendedParams) {
    var defaultParams = {};

    //These two params will 'always' be required.
    //params passed will over read default params i.e. part can be changed from snippet 
    defaultParams.key = 'AIzaSyBMKG6jvjbebLsWiijQ7WS_PAlg78bavuY';
    defaultParams.part = 'snippet';

    return angular.extend({}, defaultParams, extendedParams);
  };

  service.fetch = function(endpoint, params) {
    params = setParams(params);
    //create api end point
    var url = baseUrl + endpoint + "?" + $rootScope.UTIL.serializeUrl(params);

    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: url
        }).then(function (response) {
          resolve(response);
        }, function (response) {
          reject(response);
        });
      });
  };

  service.setRecentlyWatch = function(id, data) {
    //localStorageService.clearAll();
    var localStorage = localStorageService.get('recentlyWatched') || {};    

    //turn nested objects into an array
    var arr = [];
    for(var item in localStorage) {
      arr.push(localStorage[item]);
    }

    //add new item to the top of the array
    arr.unshift(data);
    
    //turn back into objects
    localStorage = {};
    for(var i = 0; i < arr.length; i++) {
      //key is set to query for later use
      var id = arr[i].snippet.query;
      if(i<numOfResults) { //limit the number of results
        localStorage[id] = arr[i]; 
      } 
    }
    //store as a json object
    localStorageService.set('recentlyWatched', localStorage);
  };

  service.fetchRecentWatch = function() {
    var results = [];
    var localStorage = localStorageService.get('recentlyWatched');
    
    //turn list of objects into an array so i can use filters
    //and to stay consistant with how items are delivered to the view
    for(var item in localStorage) {
      results.push(localStorage[item]);
    }
    return results; 
  };

  return service;
}

export default {
  name: 'YoutubeService',
  fn: YoutubeService
};