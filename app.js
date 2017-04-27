var app=angular.module("chatapp",['btford.socket-io']);

app.controller("maincontroller",maincontroller);

function maincontroller($scope,chatSocket){
	console.log("connected");
	chatSocket.on('connect-disconnect',function(data){
		console.log("connected",data);
		$scope.data=data;
	});

}