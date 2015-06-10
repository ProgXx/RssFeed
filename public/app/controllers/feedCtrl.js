//Defines controlled for the feed. 
angular.module('feedCtrl',['feedService'])

.controller('FeedController',function(Feed,socketio){

	var vm = this;
	vm.feeds = [];
	vm.feedData = [];
	//Retrieve all the feed from the databse.
	Feed.allFeed().success(function(data){
		console.log(data);
		angular.forEach(data,function(key,value){
			vm.loadFeed(key.content)
		});
	});
	//Save the url and retrieve the feed from the url provided by the user.
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
	
	//listen for the updates in the feed database.
	socketio.on('feed',function(data){
		console.log(data.content);
		vm.loadFeed(data.content);
	});
	
	//Load the feed from the url provided.
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
