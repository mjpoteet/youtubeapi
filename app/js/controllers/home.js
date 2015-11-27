'use strict';

function HomeCtrl($scope, $state, $location, YoutubeService) {
	'ngInject';
	
	// ViewModel
	const vm = this;
	
	vm.query = $state.params.slug;
	vm.searchResults = [];

	var nextPageToken = '';

	var getSearchList = function(query) { 
		var promise = YoutubeService.fetch('search',  query);

		promise.then(function(results) {
			nextPageToken = results.data.nextPageToken;

			if(vm.searchResults.length === 0) {
				vm.searchResults = results.data.items;
			} else {
				console.log(results.data.items);
			}
		}, function(reason) {
			//alert('Failed: ' + reason);
		});
	};
  
	vm.submitSearch = function(query) {
		$location.path("/"+query);
		getSearchList({q: query});
	};

	getSearchList({q: vm.query});

	vm.loadMore = function() {
		getSearchList({
			q: vm.query,
			pageToken: nextPageToken
		});
	};
}
export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};