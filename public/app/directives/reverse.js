//Directive to reverse the list of items .
angular.module('reverseDirections',[])

.filter('reverse',function(){
	return function(items){
		if (!items || !items.length) { return; }
		return items.slice().reverse();
	};
});
