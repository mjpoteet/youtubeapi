'use strict';

function comments() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/comments.html',
    scope: {
      data: '=',
      showReplies: '&'
    },
    link: (/*scope, element*/) => {
      /*scope.showreplies = function(id) {
        //TODO: figure out how to get the replies of youtube comments.
        //scope.showReplies({'commentId':id});
      };*/
    }
  };
}

export default {
  name: 'comments',
  fn: comments
};