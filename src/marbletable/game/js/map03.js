var Map03	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}

	// add a skymap	
	if( GAME.profile.skymapEnabled ){
		var mesh	= THREEx.createSkymap('swedishroyalcastle')
		scene.add( mesh )		
	}

	// init lighting
	var lighting	= new LightingSunset()
	this.lighting	= lighting
	scene.add(lighting.object3d)

	// add table
	var table	= new MapTable()
	this.table	= table
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
	
	

	var nineballs	= [
		{	position	: new THREE.Vector3( 0,0,0),
			texture		: THREEx.createPoolBall.ballTexture('9', true, "#FDD017", 512),
		},
		{	position	: new THREE.Vector3(-1,0,0),
			texture		: THREEx.createPoolBall.ballTexture('8', true, "#000000", 512),
		},
		{	position	: new THREE.Vector3( 1,0,0),
			texture		: THREEx.createPoolBall.ballTexture('3', false, "#F62817", 512)
		},
		{	position	: new THREE.Vector3(-0.5,0,-Math.sin(1)),
			texture		: THREEx.createPoolBall.ballTexture('2', true, "#2B65EC", 512)
		},
		{	position	: new THREE.Vector3(0.5,0,-Math.sin(1)),
			texture		: THREEx.createPoolBall.ballTexture('6', true, "#348017", 512)
		},
		// another line
		{	position	: new THREE.Vector3(0,0,-2*Math.sin(1)),
			texture		: THREEx.createPoolBall.ballTexture('4', false, "#7A5DC7", 512)
		},
		// another line
		{	position	: new THREE.Vector3(-0.5,0,+Math.sin(1)),
			texture		: THREEx.createPoolBall.ballTexture('5', true, "#F87217", 512)
		},
		{
			position	: new THREE.Vector3(0.5,0,+Math.sin(1)),
			texture		: THREEx.createPoolBall.ballTexture('7', true, "#A52A2A", 512),
		},
		// another line
		{
			position	: new THREE.Vector3(0,0,+2*Math.sin(1)),
			texture		: THREEx.createPoolBall.ballTexture('1', false, "#FDD017", 512),
		},
	];
	
	nineballs.forEach(function(config){
		var position	= config.position.clone()
		position.multiplyScalar(1.5*GAME.tileW*2)
		position.add(new THREE.Vector3(0, 1.5*GAME.tileW, 0))
		var botBall	= new BotBall({
			texture		: config.texture,
			position	: position,
			ballAttraction	: 0
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})	

}
