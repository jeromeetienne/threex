var MapPool1	= function(){
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
		var mesh	= THREEx.createSkymap('swedishroyalcastle')
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
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
			
	var groundMesh	= null
	table.object3d.traverse(function(object3d){
		if( / ground /.test(object3d.name) === false )	return

		var texture	= THREE.ImageUtils.loadTexture('images/SUNNY-Pool-Table.jpg')
		texture.wrapS	= THREE.RepeatWrapping
		texture.wrapT	= THREE.RepeatWrapping
		texture.repeat.x= 4
		texture.repeat.y= 4
		var material	= new THREE.MeshPhongMaterial({
			map		: texture,
			bumpMap		: texture,
			bumpScale	: 0.025,
		})
		object3d.material	= material
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		init Player								//
	//////////////////////////////////////////////////////////////////////////////////
	;(function(){
		var player	= new Player()
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
		var texture	= THREEx.createPoolBall.ballTexture('8', true, "#000000", 512)
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
}
