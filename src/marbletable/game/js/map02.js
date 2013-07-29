var Map02	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	// add a skymap	
	if( GAME.profile.skymapEnabled ){
		var mesh	= THREEx.createSkymap('mars')
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
	
	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/jupitermap.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/mars_1k_color.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/neptunemap.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/venusmap.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg')
		})
		botBall.object3d.material.bumpMap	= THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg'),
		botBall.object3d.material.bumpScale	= 0.01;

		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
}
