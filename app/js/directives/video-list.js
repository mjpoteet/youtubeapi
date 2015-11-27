'use strict';

videoList.$inject = [];

function videoList() {
  return {
    restrict: 'EA',
    scope: {
    	data:'=',
    	type:'=',
    	loadMore: '&loadMoreFn',
    },
    templateUrl: 'directives/video-list.html',
	link: function(scope, element, attrs) {
		scope.loadmore = function(){
			scope.loadMore();
		}
	}
  };
}

export default {
  name: 'videolist',
  fn: videoList
};
