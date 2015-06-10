//Defines UserController
angular.module('userCtrl',['userService'])

.controller("UserController",function(User){
	var vm = this;

	User.all()
		.success(function(data){
			vm.users = data;
		});
})

.controller('UserCreateController',function(User,$location,$window){
	var vm = this;
	// Create the user and redirect to the index page.
	vm.signupUser = function(){
		vm.message = '';
		User.create(vm.userData)
			.then(function(response){
				vm.userData = {};
				vm.message = response.data.message;
				$window.localStorage.setItem('token',response.data.token);
				$location.path('/');
			});
	};
});
