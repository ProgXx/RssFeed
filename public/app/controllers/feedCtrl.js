angular.module('feedCtrl',['feedService'])

.controller('FeedController',function(Feed,socketio){

	var vm = this;
	vm.feeds = [];
	vm.feedData = [];
	Feed.allFeed().success(function(data){
		angular.forEach(data,function(key,value){
			vm.loadFeed(key.content)
		});
	});

	vm.createFeed = function(){
		vm.processing = true;
		vm.message = '';
		Feed.create(vm.feedData)
			.success(function(data){
				vm.processing = false;
				vm.message = data.message;
				vm.loadFeed(data.content);
			});
	};

	socketio.on('feed',function(data){
		vm.loadFeed(data.content);
	})

	vm.loadFeed = function(url){
		Feed.parseFeed(url).then(function(res){
			vm.feeds.push({
				title: res.data.responseData.feed.title,
				entries : res.data.responseData.feed.entries
			});			
        });
	};
})
