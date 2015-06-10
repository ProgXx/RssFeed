angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/',{
			templateUrl : '/app/views/pages/home.html',
			controller : 'MainController',
			controllerAs : 'main'
		})
		.when('/login',{
			templateUrl: '/app/views/pages/login.html'
		})
		.when('/signup',{
			templateUrl: '/app/views/pages/signup.html'
		})
		.when('/allfeeds',{
			templateUrl: '/app/views/pages/allFeeds.html',
			controller: 'AllFeedsController',
			controllerAs: 'feed',
			resolve:{
				feeds: function(Feed){
					return Feed.allStories();
				}
			}
		})
		
	$locationProvider.html5Mode(true);
})