'use strict';

function youtubePlayer() {
  return {
    restrict: 'EA',
    scope: { query:'=', info:'=', fullUrl: '@' },
    templateUrl: 'directives/youtube-player.html',
    link: function (scope) {
      scope.fullUrl = 'http://www.youtube.com/embed/' + scope.query; 
    }
  };
}

export default {
  name: 'youtubePlayer',
  fn: youtubePlayer
};
