'use strict';
function YoutubeService($http, $q, $rootScope) {
  'ngInject';
  
  const baseUrl = 'https://www.googleapis.com/youtube/v3/';
  const service = {};

  var setParams = function(extendedParams) {
    var defaultParams = {};

    //These two params will 'always' be required.
    //params passed will over read default params i.e. part can be 
    defaultParams.key = 'AIzaSyBMKG6jvjbebLsWiijQ7WS_PAlg78bavuY';
    //second api key
    //defaultParams.key = 'AIzaSyD_JPqzAK1Vo_wfQNq8XTVMwzhQyg0Ei60';
    defaultParams.part = 'snippet';

    return angular.extend({}, defaultParams, extendedParams);
  };

  service.fetch = function(endpoint, params) {
    params = setParams(params);
    //create api end point
    var url = baseUrl + endpoint + "?" + $rootScope.UTIL.serializeUrl(params);
    //defferer
    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: url
        }).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
  };

  service.someEvent = function() {
    console.log('hello world');
  }

  return service;

}

export default {
  name: 'YoutubeService',
  fn: YoutubeService
};