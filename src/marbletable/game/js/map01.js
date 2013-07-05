var Map01	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	// add table
	var table	= new MapTable()
	scene.add(table.object3d)
	updateFcts.push(function(delta, now){
		table.update(delta, now)
	})
	
	// add botGoal
	var botGoal	= new BotGoal
	updateFcts.push(function(delta, now){
		botGoal.update(delta, now)
	})
	var body	= botGoal.object3d.userData.cannonBody.origin
	body.position.set(24*GAME.tileW, 3 * GAME.tileW/2, 0*GAME.tileW)

	// add botBall
	for(var i = 0; i < 1; i++){
		(function(){
			var botBall	= new BotBall()
			updateFcts.push(function(delta, now){
				botBall.update(delta, now)
			})
		})()
	}
}
