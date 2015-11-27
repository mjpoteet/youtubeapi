'use strict';

function search() {
  return {
    restrict: 'EA',
    templateUrl: 'directives/search-form.html',
    scope: {
      query: '@',
      submitQuery: '&callbackFn',
    },
    link: (scope, element) => {
      element.on('submit', () => {
        console.log('hit');
         scope.submitQuery({query: scope.query});
      });
    }
  };
}

export default {
  name: 'search',
  fn: search
};
