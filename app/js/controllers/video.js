'use strict';

function VideoCtrl($scope, $state, $sce, YoutubeService) {
  'ngInject';
  // ViewModel
  
  const vm = this;
  vm.query = $state.params.slug;

  var fetchVideo = () => {
  	var promise = YoutubeService.fetch('videos', {id:vm.query});

  	promise.then(function(results) {
  		vm.info = results.data.items[0];
  	}, function(reason) {
  		//alert('Failed: ' + reason);
  	});
  }

  fetchVideo();
}
export default {
  name: 'VideoCtrl',
  fn: VideoCtrl
};