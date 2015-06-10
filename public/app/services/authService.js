//Creates auth service.
angular.module('authService',[])

.factory('Auth',function($http, $q, AuthToken){
	var authFactory = {};
	// To login the user and set the token for session validation.
	authFactory.login = function(username,password){
		return $http.post('/api/login',{
			username: username,
			password: password
		})
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		})
	};
	//To logout, invalidate the session.
	authFactory.logout = function(){
		AuthToken.setToken();
	};
	//To check if user is logged in.
	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken())
			return true;
		return false;
	};
	//To get the user information.
	authFactory.getUser = function(){
		if(AuthToken.getToken())
			return $http.get('/api/me');
		return $q.reject({message: "User has no token"}); 
	}
	return authFactory;
})

.factory('AuthToken',function($window){
	var authTokenFactory = {};
	//Retrieve the token from the localstorage of the browser.
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};
	//Set token in the localstorage of the browser.
	authTokenFactory.setToken = function(token){
		if(token)
			$window.localStorage.setItem('token',token);
		else
			$window.localStorage.removeItem('token');
	};
	return authTokenFactory;
})

.factory('AuthInterceptor',function($q,$location,AuthToken){
	var interceptorFactory = {};
	//Set the token in the header information.
	interceptorFactory.request = function(config){
		var token = AuthToken.getToken();
		if(token){
			config.headers['x-access-token'] = token;
		}
		return config;
	};
	//If error is encountered ,send the appropriate response.
	interceptorFactory.responseError = function(response){
		if(response.status = 403)
			$location.path('/login');
		return $q.reject(response);
	};
	return interceptorFactory;
});

