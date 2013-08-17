var MapPlanets1	= function(){
	// handle updateFcts for sounds
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
		var geometry	= new THREE.SphereGeometry(90, 32, 32)
		var material	= new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
			side	: THREE.BackSide
		})
		var starSphere	= new THREE.Mesh(geometry, material)
		scene.add(starSphere)
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
		var textureColor= THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg')
		var textureBump	= THREE.ImageUtils.loadTexture('images/planets/earthbump1k.jpg')
		var textureSpec	= THREE.ImageUtils.loadTexture('images/planets/earthspec1k.jpg')
		var player	= new Player({
			liveMirror	: false,
			material	: new THREE.MeshPhongMaterial({
				map		: textureColor,
				bumpMap		: textureBump,
				bumpScale	: 0.02,
				specularMap	: textureSpec,
				specular	: new THREE.Color('grey'),
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
		var texture	= THREE.ImageUtils.loadTexture('images/planets/jupitermap.jpg')
		var botBall	= new BotBall2({
			ballAttraction	: 0.0,
			material	: new THREE.MeshPhongMaterial({
				map	: texture,
			}),
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
	;(function(){
		var texture	= THREE.ImageUtils.loadTexture('images/planets/mars_1k_color.jpg')
		var botBall	= new BotBall2({
			ballAttraction	: 0.0,
			material	: new THREE.MeshPhongMaterial({
				map	: texture,
			}),
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
	;(function(){
		var texture	= THREE.ImageUtils.loadTexture('images/planets/neptunemap.jpg')
		var botBall	= new BotBall2({
			radius		: 3 * GAME.tileW,
			ballAttraction	: 0.0,
			material	: new THREE.MeshPhongMaterial({
				map	: texture,
			}),
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

}
