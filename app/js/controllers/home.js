'use strict';

function HomeCtrl($scope, $state, $location, YoutubeService) {
	'ngInject';
	
	// ViewModel
	const vm = this;
	
	vm.query = $state.params.slug;
	vm.searchResults = [];

	var nextPageToken = '',
		totalResults;

	//reusable functions
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

	//actions
	vm.submitSearch = (query) => {
		vm.query = query;
		$location.path("/" + vm.query);
		getSearchList({q: vm.query, maxResults: 10});
	};

	vm.loadMore = () => {
		getSearchList({
			q: vm.query,
			maxResults: 20,
			pageToken: nextPageToken
		});
	};

	//initialize home page functions
	vm.recentlyWatched = YoutubeService.fetchRecentWatch().length > 0 ? YoutubeService.fetchRecentWatch() : null;
	console.log(vm.recentlyWatched);
	getSearchList({q: vm.query, maxResults: 10});
}
export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};