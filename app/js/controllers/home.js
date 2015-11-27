'use strict';

function HomeCtrl($scope, YoutubeService) {
	'ngInject';
	
	// ViewModel
	const vm = this;
	vm.query = '';
  
	var getSearchList = function(query) { 
		var promise = YoutubeService.fetch('search',  query);

		promise.then(function(results) {
			vm.searchResults = results.data.items;
		}, function(reason) {
		//alert('Failed: ' + reason);
		});
	};

	getSearchList();
  
	vm.submitSearch = function(query) {
		getSearchList({q: query});
	};
}
export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};