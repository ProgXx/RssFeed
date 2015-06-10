//Creates feedService.
angular.module("feedService",[])

.factory('Feed',function($http){
	var feedFactory = {};
	//Retrieve all the feeds from the server.
	feedFactory.allFeeds = function(){
		return $http.get('/api/all_feeds');
	}
	//Create the feed 
	feedFactory.create = function(feedData){
		return $http.post('/api',feedData);
	};
	// Retrieve feed from the server.
	feedFactory.allFeed = function(){
		return $http.get('/api');
	};
	//Parse the feed from the url's provided.
	feedFactory.parseFeed = function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
	return feedFactory;

})
//socket.io to connect to the server and listen for changes in the database.
.factory('socketio',function($rootScope){
	var socket = io.connect();
	return {
		on: function(eventName, callback){
			socket.on(eventName,function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			});
		},
		emit: function(eventName,data,callback){
			socket.emit(eventName,data,function(){
				var args = arguments;
				$rootScope.apply(function(){
					if(callback){
						callback.apply(socket,args);
					}
				});
			});
		}
	};
})
