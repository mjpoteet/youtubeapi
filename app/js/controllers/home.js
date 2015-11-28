'use strict';

function HomeCtrl($scope, $state, $location, YoutubeService, localStorageService) {
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
			console.log('Failed: ' + reason);
		});
	};

	vm.submitSearch = (query) => {
		vm.query = query;
		$location.path("/" + vm.query);
		getSearchList({q: vm.query, maxResults: 10});
	};

	getSearchList({q: vm.query, maxResults: 10});

	vm.loadMore = () => {
		getSearchList({
			q: vm.query,
			maxResults: 20,
			pageToken: nextPageToken
		});
	};
	console.log(localStorageService.get('recentlyWatched'));
}
export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};


/*var getCategoryVideos = (query, assignTo) => {
		var promise = YoutubeService.fetch('search',  query);
		
		promise.then((results) => {
			vm[assignTo] = results.data.items;
		}, (reason) => {
			//alert('Failed: ' + reason);
		});
  	};
	
	getCategoryVideos({channelId:'UC3XTzVzaHQEd30rQbuvCtTQ', maxResults: 3}, 'channel1');
	getCategoryVideos({channelId:'UC3XTzVzaHQEd30rQbuvCtTQ', maxResults: 3}, 'channel2');
	getCategoryVideos({channelId:'UC3XTzVzaHQEd30rQbuvCtTQ', maxResults: 3}, 'channel3');*/