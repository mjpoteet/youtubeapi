'use strict';

function VideoCtrl($scope, $state, $sce, $location, YoutubeService) {
  'ngInject';
  // ViewModel
  
  const vm = this;
  vm.query = $state.params.slug;

  if(vm.query === '') {
    $location.path('/');
  }

  var setRecentViewed = () => {
      var data = {
        snippet : {
          query : vm.query,
          title : vm.info.snippet.title,
          thumbnails : vm.info.snippet.thumbnails,
        },
        id : {videoId : vm.info.id}
      };
      console.log(data);
      YoutubeService.setRecentlyWatch(vm.query, data);
  };
  
  var fetchComments = () => {
    var promise = YoutubeService.fetch('commentThreads', {
      videoId: vm.query,
      order:'relevance',
      maxResults:20
    });

    promise.then((results) => {
      vm.comments = results.data;
    }, (reason) => {
      console.log('Failed: ' + reason);
    });
  };

  var fetchVideo = () => {
    var promise = YoutubeService.fetch('videos', {id:vm.query});

    promise.then((results) => {
      vm.info = results.data.items[0];
      setRecentViewed();
    }, (reason) => {
      console.log('Failed: ' + reason);
    });
  };

  var fetchRelatedVideos = () => {
  	/*var promise = YoutubeService.fetch('videos', {relatedToVideoId:vm.query, type:'video'});

  	promise.then((results) => {
  		vm.relatedVideos = results.data;
    }, (reason) => {
      console.log('Failed: ' + reason);
    });*/
  };

  fetchVideo();
  fetchRelatedVideos();
  fetchComments();

  vm.showReplies = function(commentId) {

    console.log(commentId);
  };
}
export default {
  name: 'VideoCtrl',
  fn: VideoCtrl
};