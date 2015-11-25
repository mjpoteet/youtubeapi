'use strict';

HomeCtrl.$inject = ['$scope', 'YoutubeService'];

function HomeCtrl($scope, YoutubeService) {
  // ViewModel
  const vm = this;
  vm.query = '';

  vm.submitSearch = function(query) {
	var promise = YoutubeService.search(query);
	
	promise.then(function(results) {
		vm.searchResults = results.data.items;
		console.log(vm.searchResults);
	}, function(reason) {
		//alert('Failed: ' + reason);
	});
  };
}
export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};