var app = require('http').createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);
io.set('log level', 1);


// establish the physicFcts	
var physicFcts	= [];
var physicPeriod= 1000/15
setInterval(function(){
	physicFcts.forEach(function(physicFct){
		physicFct(physicPeriod)
	})
}, physicPeriod)

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

var Player	= function(socket){
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	})
	
	var pendindUserCommands	= []
	var lastCommandId	= null;

	socket.on('userCommand', function(userCommand){
		pendindUserCommands.push(userCommand)
	})
	
	var sharedStates	= {
		socketId: socket.id,
		x	: (Math.random()-0.5)*4,
		y	: (Math.random()-0.5)*4
	}
	
	socket.emit('initialState', sharedStates)

	this.processUserCommand	= function(delta){
		if( pendindUserCommands.length === 0 )	return

		lastCommandId	= pendindUserCommands[pendindUserCommands.length-1].id
		pendindUserCommands.forEach(function(userCommand){
			if( userCommand.command === 'left' )	sharedStates.x	+= 1*delta;
			if( userCommand.command === 'right' )	sharedStates.x	-= 1*delta;
			if( userCommand.command === 'up' )	sharedStates.y	+= 1*delta;
			if( userCommand.command === 'down' )	sharedStates.y	-= 1*delta;
			
			sharedStates.x	= Math.min(sharedStates.x, 3)
			sharedStates.x	= Math.max(sharedStates.x, 3)
			sharedStates.y	= Math.min(sharedStates.y, 3)
			sharedStates.y	= Math.max(sharedStates.y, 3)			
		})

		pendindUserCommands	= []
	}
}

var players	= [];

physicFcts.push(function(delta){
	players.forEach(function(player){
		player.processUserCommand(delta)
	})
})
//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

io.sockets.on('connection', function (socket) {
	console.log('connection', socket.id)
	var player 	= new Player(socket)
	players.push(player)
	socket.on('disconnect', function(){
		console.log('disconnection', socket.id)
		var index	= players.indexOf(player)
		console.assert(index !== -1)
		players.splice(index, 1);
	})
});