angular.module("feedService",[])

.factory('Feed',function($http){
	var feedFactory = {};

	feedFactory.allFeeds = function(){
		return $http.get('/api/all_feeds');
	}

	feedFactory.create = function(feedData){
		return $http.post('/api',feedData);
	};

	feedFactory.allFeed = function(){
		return $http.get('/api');
	};

	feedFactory.parseFeed = function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
	return feedFactory;

})

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
