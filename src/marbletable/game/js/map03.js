var Map03	= function(){
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
		{
			position	: new THREE.Vector3(0.5,0,-Math.sin(1)),
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
