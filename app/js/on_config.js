'use strict';

function OnConfig($stateProvider, $locationProvider, $sceDelegateProvider, $urlRouterProvider, localStorageServiceProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('Home', {
      url: '/:slug',
      controller: 'HomeCtrl as home',
      templateUrl: 'home.html',
      title: 'Home'
    })
    .state('Video', {
      url: '/video/:slug',
      controller: 'VideoCtrl as video',
      templateUrl: 'video.html',
      title: 'Video'
    });

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://www.youtube.com/embed/**'
  ]);

  $urlRouterProvider.otherwise('/');

  localStorageServiceProvider.setPrefix('recentlyWatched').setStorageType('sessionStorage');
}

export default OnConfig;