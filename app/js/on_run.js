'use strict';

function OnRun($rootScope, $location, AppSettings) {
  'ngInject';
  var classManager = (state) => {
    $rootScope.showHeaderSearch = true;
    if(state === 'Home') {
      $rootScope.showHeaderSearch = false;
    }
    $rootScope.pageTitle += AppSettings.appTitle;
  };

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';
    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    
    classManager(toState.name);
  });

  $rootScope.UTIL = {
    serializeUrl : function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }
  };

  //global functions.
  $rootScope.submitSearch = (query) => {
    $rootScope.$apply(function(){
      $location.path("/"+query);
    });
  };

}

export default OnRun;