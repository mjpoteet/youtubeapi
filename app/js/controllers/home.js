'use strict';

function HomeCtrl($scope, $state, $location, YoutubeService) {
	'ngInject';
	
	// ViewModel
	const vm = this;
	
	vm.query = $state.params.slug;
	vm.searchResults = [];

	var nextPageToken = '',
		totalResults;

	var getSearchList = (query) => { 
		var promise = YoutubeService.fetch('search',  query);
		
		promise.then((results) => {
			nextPageToken = results.data.nextPageToken;
			totalResults = results.data.pageInfo.totalResults;
			vm.searchResults.push.apply(vm.searchResults, results.data.items);
		}, (reason) => {
			//alert('Failed: ' + reason);
		});
	};

  	var getCategoryVideos = (query, assignTo) => {
		var promise = YoutubeService.fetch('search',  query);
		
		promise.then((results) => {
			vm[assignTo] = results.data.items;
		}, (reason) => {
			//alert('Failed: ' + reason);
		});
  	};
	
	vm.submitSearch = (query) => {
		vm.query = query;
		$location.path("/" + vm.query);
		getSearchList({q: vm.query, maxResults: 20});
	};

	getCategoryVideos({channelId:'UC3XTzVzaHQEd30rQbuvCtTQ', maxResults: 10}, 'list1');

	getSearchList({q: vm.query, maxResults: 20});

	vm.loadMore = () => {
		getSearchList({
			q: vm.query,
			maxResults: 20,
			pageToken: nextPageToken
		});
	};
}
export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};