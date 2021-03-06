//Creates userService.
angular.module("userService",[])
.factory('User',function($http){
	var userFactory = {};
	//Create the user 
	userFactory.create = function(userData){
		return $http.post('/api/signup',userData);
	}
	//Retrieve all the users.
	userFactory.all = function(){
		return $http.get('/api/users');
	}
	return userFactory;
})
