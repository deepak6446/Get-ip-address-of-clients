var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var room=[],index,i;
io.on('connection',function(socket){
	console.log("Connected user Ip address : ",socket.request.connection.remoteAddress);
	var user=socket.request.connection.remoteAddress;
	room.push({user:user});
	io.sockets.emit('connect-disconnect',room);
	socket.on('disconnect',function(){
		console.log("Disconnected user Ip address : ",user);
		for(i=0;i<room.length;i++){
			if(user==room[i].user){
				index=i;
				break;
			}
		}
		room.splice(index,1);
		io.sockets.emit('connect-disconnect',room);
	});
});
app.use(express.static(__dirname));
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});
http.listen(3000,function(){
	console.log("connected to localhost:3000");
    console.log("Log of User's connection and disconnection");
    console.log("!!!!                                   !!!");
});