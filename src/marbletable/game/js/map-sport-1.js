var MapSport1	= function(){
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
	//		BasketBall							//
	//////////////////////////////////////////////////////////////////////////////////
	
	;(function(){
		var texture	= THREE.ImageUtils.loadTexture('images/ballTextures/BasketballColor.jpg')
		var botBall	= new BotBall2({
			ballAttraction	: 0.0,
			material	: new THREE.MeshPhongMaterial({
				map	: texture,
				// bumpMap	: texture,
				// bumpScale: 0.05,
			}),
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	//////////////////////////////////////////////////////////////////////////////////
	//		SoftBall							//
	//////////////////////////////////////////////////////////////////////////////////
	
	;(function(){
		var textureColor= THREE.ImageUtils.loadTexture('images/ballTextures/SoftBallColor.jpg')
		var textureBump	= THREE.ImageUtils.loadTexture('images/ballTextures/SoftBallBump.jpg')
		var botBall	= new BotBall2({
			ballAttraction	: 0.0,
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


	//////////////////////////////////////////////////////////////////////////////////
	//		Tennis								//
	//////////////////////////////////////////////////////////////////////////////////
	
	;(function(){
		var textureColor= THREE.ImageUtils.loadTexture('images/ballTextures/NewTennisBallColor.jpg')
		var textureBump	= THREE.ImageUtils.loadTexture('images/ballTextures/TennisBallBump.jpg')
		var botBall	= new BotBall2({
			ballAttraction	: 0.0,
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
