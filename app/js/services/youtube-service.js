'use strict';
function YoutubeService($http, $q, AppSettings) {
  'ngInject';
  
  var apiUrl = 'https://www.googleapis.com/youtube/v3/',
      apiKey = '&key=AIzaSyBMKG6jvjbebLsWiijQ7WS_PAlg78bavuY',
      googleLoginApiKey = '&key=AIzaSyBv1JXypU0YLWTz5lRy4ARVSXO9_CISm68',
      querySearch = 'search?part=snippet&maxResults=20&order=viewCount&q=',
      queryFetchVideo = 'videos?part=snippet&id=';

  const service = {};
  service.search = function(query) {
    //TODO: figure out how to get the google (gapi) to work in angular
    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: apiUrl+querySearch+query+apiKey
        }).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
  };

  service.fetchVideo = function(query) {
    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: apiUrl+queryFetchVideo+query+apiKey
        }).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
  };
  return service;

}

export default {
  name: 'YoutubeService',
  fn: YoutubeService
};