var MapSport1	= function(opts){
	// parse argument
	opts			= opts	|| {}
	opts.respawnedEnabled	= opts.respawnedEnabled !== undefined ? opts.respawnedEnabled : false
	opts.ballAttraction	= opts.ballAttraction !== undefined ? opts.ballAttraction : 0.1
	opts.nBalls		= opts.nBalls !== undefined ? opts.nBalls : 2

	//////////////////////////////////////////////////////////////////////////////////
	//		update loop								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
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
		var player	= new Player({
			liveMirror	: false,
			material	: new THREE.MeshPhongMaterial({
				map	: texture,
				bumpMap	: texture,
				bumpScale: 0.01,
			}),
		})
		GAME.ball	= player.mesh
		updateFcts.push(function(delta, now){
			player.update(delta, now)
		})
		var body	= GAME.ball.userData.cannonBody.body
		body.position.set(-15*GAME.tileW, 20*GAME.tileW, 0*GAME.tileW)	
	})()



	//////////////////////////////////////////////////////////////////////////////////
	//		BasketBall							//
	//////////////////////////////////////////////////////////////////////////////////
	
	;(function(){
		var texture	= THREE.ImageUtils.loadTexture('images/ballTextures/BasketballColor.jpg')
		var nBallsType	= Math.round(opts.nBalls/3)
		for(var i = 0; i < nBallsType; i++){
			;(function(){
				var botBall	= new BotBall2({
					ballAttraction	: opts.ballAttraction,
					respawnedEnabled: opts.respawnedEnabled,
					material	: new THREE.MeshPhongMaterial({
						map	: texture,
					}),
				})
				updateFcts.push(function(delta, now){
					botBall.update(delta, now)
				})
			})()			
		}
	})()

	//////////////////////////////////////////////////////////////////////////////////
	//		SoftBall							//
	//////////////////////////////////////////////////////////////////////////////////
	
	;(function(){
		var textureColor= THREE.ImageUtils.loadTexture('images/ballTextures/SoftBallColor.jpg')
		var textureBump	= THREE.ImageUtils.loadTexture('images/ballTextures/SoftBallBump.jpg')
		var nBallsType	= Math.round(opts.nBalls/3)
		for(var i = 0; i < nBallsType; i++){
			;(function(){
				var botBall	= new BotBall2({
					ballAttraction	: opts.ballAttraction,
					respawnedEnabled: opts.respawnedEnabled,
					material	: new THREE.MeshPhongMaterial({
						map	: textureColor,
						bumpMap	: textureBump,
						bumpScale: 0.02,
					}),
				})
				updateFcts.push(function(delta, now){
					botBall.update(delta, now)
				})			
			})()			
		}
	})()


	//////////////////////////////////////////////////////////////////////////////////
	//		Tennis								//
	//////////////////////////////////////////////////////////////////////////////////
	
	;(function(){
		var textureColor= THREE.ImageUtils.loadTexture('images/ballTextures/NewTennisBallColor.jpg')
		var textureBump	= THREE.ImageUtils.loadTexture('images/ballTextures/TennisBallBump.jpg')
		var nBallsType	= Math.round(opts.nBalls/3)
		for(var i = 0; i < nBallsType; i++){
			;(function(){
				var botBall	= new BotBall2({
					ballAttraction	: opts.ballAttraction,
					respawnedEnabled: opts.respawnedEnabled,
					material	: new THREE.MeshPhongMaterial({
						map	: textureColor,
						bumpMap	: textureBump,
						bumpScale: 0.02,
					}),
				})
				updateFcts.push(function(delta, now){
					botBall.update(delta, now)
				})
			})()			
		}
	})()
}
