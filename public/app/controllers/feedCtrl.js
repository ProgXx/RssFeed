angular.module('feedCtrl',['feedService'])

.controller('FeedController',function(Feed,socketio){

	var vm = this;
	vm.feeds = [];
	vm.feedData = [];
	Feed.allFeed().success(function(data){
		console.log(data);
		angular.forEach(data,function(key,value){
			vm.loadFeed(key.content)
		});
	});

	vm.createFeed = function(){
		vm.processing = true;
		vm.message = '';
		console.log(vm.feedData);
		Feed.create(vm.feedData)
			.success(function(data){
				console.log(data);
				vm.processing = false;
				vm.feedData = "";
				vm.message = data.message;
				vm.loadFeed(vm.feedData.content);
			});
	};

	socketio.on('feed',function(data){
		console.log(data.content);
		vm.loadFeed(data.content);
	})

	vm.loadFeed = function(url){
		Feed.parseFeed(url).then(function(res){
			if(res.data.responseData){
				vm.feeds.push({
					title: res.data.responseData.feed.title,
					entries : res.data.responseData.feed.entries
				});
			}						
        });
	};
})
