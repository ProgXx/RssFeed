angular.module('MyApp',['appRoutes','mainCtrl','authService','userService','userCtrl','feedCtrl','feedService','reverseDirections'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
})