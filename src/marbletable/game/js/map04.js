var Map04	= function(){
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
	var body	= botGoal.object3d.userData.cannonBody.body
	body.position.set(24*GAME.tileW, 3 * GAME.tileW/2, 0*GAME.tileW)

	;(function(){
		var texture	= cache.getSet('texture.basketball', function(){
			var texture	= THREE.ImageUtils.loadTexture('images/sports/Basketball texture small.jpgb0270bdb-8751-473f-86c6-0c72ca7480b9Large.jpg')
			return texture
		})
		var botBall	= new BotBall({
			texture	: texture
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var texture	= cache.getSet('texture.soccerball', function(){
			var texture	= THREE.ImageUtils.loadTexture('images/sports/Footballballfree.jpg59a2a1dc-64c8-4bc3-83ef-1257c9147fd1Large.jpg')
			return texture
		})
		var botBall	= new BotBall({
			texture	: texture
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
}
