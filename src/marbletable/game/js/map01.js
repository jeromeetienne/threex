var Map01	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	// add a skymap	
	if( GAME.profile.skymapEnabled ){
		var mesh	= THREEx.createSkymap('skybox')
		scene.add( mesh )		
	}
	// init lighting
	var lighting	= new LightingDefault()
	this.lighting	= lighting
	scene.add(lighting.object3d)


	// add table
	var table	= new MapTable()
	this.table	= table;
	scene.add(table.object3d)
	updateFcts.push(function(delta, now){
		table.update(delta, now)
	})
	
	// add botGoal
	var botGoal	= new BotGoal
	table.object3d.add(botGoal.object3d)
	updateFcts.push(function(delta, now){
		botGoal.update(delta, now)
	})
	var body	= botGoal.object3d.userData.cannonBody.body
	body.position.set(24*GAME.tileW, 3 * GAME.tileW/2, 0*GAME.tileW)

	//////////////////////////////////////////////////////////////////////////////////
	//		init Player								//
	//////////////////////////////////////////////////////////////////////////////////
	;(function(){
		var texture	= THREE.ImageUtils.loadTexture('images/sports/Footballballfree.jpg59a2a1dc-64c8-4bc3-83ef-1257c9147fd1Large.jpg')
		var player	= new Player()
		GAME.ball	= player.mesh
		updateFcts.push(function(delta, now){
			player.update(delta, now)
		})
		var body	= GAME.ball.userData.cannonBody.body
		body.position.set(-15*GAME.tileW, 20*GAME.tileW, 0*GAME.tileW)	
	})()

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	

	// add botEnemy
	for(var i = 0; i < 1; i++){
		(function(){
			var botEnemy	= new BotEnemy()
			updateFcts.push(function(delta, now){
				botEnemy.update(delta, now)
			})
		})()
	}

	// add bouncers
	for(var i = 0; i < 1; i++){
		(function(){
			var botBouncer	= new BotBouncer
			table.object3d.add(botBouncer.object3d)

			updateFcts.push(function(delta, now){
				botBouncer.update(delta, now)
			})
			var body	= botBouncer.object3d.userData.cannonBody.body
			body.position.set(-10*GAME.tileW, 1 * GAME.tileW, 0*GAME.tileW)
		})()
	}

	// add botBall
	for(var i = 0; i < 1; i++){
		(function(){
			var botBall	= new BotBall()
			updateFcts.push(function(delta, now){
				botBall.update(delta, now)
			})
		})()
	}

	;(function(){
		var botBall	= new BotBall({
			texture	: THREEx.createPoolBall.ballTexture('8', true, "#000000", 1024)
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
}
