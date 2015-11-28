'use strict';

function reverseloop() {
	return function(items) {
		if(items.length > 0 || items === null) {
			return items.slice().reverse();
		}
	};
}

export default {
  name: 'reverseloop',
  fn: reverseloop
};