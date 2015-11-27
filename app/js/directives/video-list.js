'use strict';

videoList.$inject = [];

function videoList() {
  return {
    restrict: 'EA',
    scope: { data:'=', type:'='},
    templateUrl: 'directives/video-list.html',
    link: function (scope) {}
  };
}

export default {
  name: 'videolist',
  fn: videoList
};
