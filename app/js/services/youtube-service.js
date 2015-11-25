'use strict';
function YoutubeService($http, $q, AppSettings) {
  'ngInject';

  const service = {};
  service.search = function(query) {
    //TODO: figure out how to get the google (gapi) to work in angular
    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: AppSettings.apiUrl+AppSettings.querySearch+query+AppSettings.apiKey
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
        url: AppSettings.apiUrl+AppSettings.queryFetchVideo+query+AppSettings.apiKey
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