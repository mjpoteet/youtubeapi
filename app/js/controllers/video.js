'use strict';

VideoCtrl.$inject = ['$scope', '$state', '$sce', 'YoutubeService'];

function VideoCtrl($scope, $state, $sce, YoutubeService) {
  // ViewModel
  
  const vm = this;
  vm.query = $state.params.slug;

  var fetchVideo = function() {
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