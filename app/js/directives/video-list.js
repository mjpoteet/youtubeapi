'use strict';

function videoList () {
  return {
    restrict: 'EA',
    scope: {
      data:'=',
      hideLoadMore:'@',
      loadMore: '&loadMoreFn',
    },
    templateUrl: 'directives/video-list.html',
    link: (scope/*, element, attr*/) => {
      console.log(scope.data);
      scope.loadmore = () => {
        scope.loadMore();
      };
    },
  };
}

export default {
  name: 'videolist',
  fn: videoList
};
