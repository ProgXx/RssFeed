//Defines MainController.
angular.module('mainCtrl',[])

.controller('MainController',function($rootScope,$location,Auth){
	var vm = this;
	vm.loggedIn = Auth.isLoggedIn();
	
	//Check for session validation if the route is changed.
	$rootScope.$on('$routeChangeStart',function(){
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
	});

	//Authenticate and Login the user.
	vm.doLogin = function(){
		vm.processing = true;
		vm.error = '';
		Auth.login(vm.loginData.username,vm.loginData.password)
			.success(function(data){
				vm.processing = false;
				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});
				if(data.success)
					$location.path('/');
				else
					vm.error = data.message;
			});
	};
	//Logout the user.
	vm.doLogout = function(){
		Auth.logout();
		$location.path('/login');
	}
})
