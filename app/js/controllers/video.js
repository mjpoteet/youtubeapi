'use strict';

function VideoCtrl($scope, $state, $sce, YoutubeService) {
  'ngInject';
  // ViewModel
  
  const vm = this;
  vm.query = $state.params.slug;
  
  var setRecentViewed = () => {
      var data = {
        snippet : {
          query : vm.query,
          title : vm.info.snippet.title,
          thumbnails : vm.info.snippet.thumbnails
        }
      };

      YoutubeService.setRecentlyWatch(vm.query, data);
  }

  var fetchVideo = () => {
  	var promise = YoutubeService.fetch('videos', {id:vm.query});

  	promise.then((results) => {
  		vm.info = results.data.items[0];
      setRecentViewed();
    }, (reason) => {
      console.log('Failed: ' + reason);
    });
  };

  fetchVideo();
}
export default {
  name: 'VideoCtrl',
  fn: VideoCtrl
};