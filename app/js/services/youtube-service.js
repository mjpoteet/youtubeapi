'use strict';
/*global angular*/
function YoutubeService($http, $q, $rootScope, localStorageService) {
  'ngInject';
  
  const baseUrl = 'https://www.googleapis.com/youtube/v3/';
  const service = {};

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
    localStorage[id] = data;
    localStorageService.set('recentlyWatched', localStorage);

    //console.log(localStorageService.get('recentlyWatched'));
    //console.log(localStorageService.get('recentlyWatched'));
    //localStorageService.set('recentlyWatched', update);
    /*var updateRecentWatch = localStorageService.get('recentlyWatched').splice(0, 0, [data]);
    localStorageService.set('recentlyWatched', updateRecentWatch);
    console.log(localStorageService.get('recentlyWatched'));*/
  };

  service.fetchRecentWatch = function() {
    console.log(localStorageService.get('recentlyWatched'));
    return localStorageService.get('recentlyWatched');
    //console.log(snippet);
  };

  return service;
}

export default {
  name: 'YoutubeService',
  fn: YoutubeService
};