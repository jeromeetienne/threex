var BotBall	= function(){
	var texture	= cache.getSet('texture.botball', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg');
		return texture
	})
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}

	var radius	= 1.5 * GAME.tileW
	var geometry	= new THREE.SphereGeometry(radius, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	this.object3d	= mesh
	mesh.name	= (mesh.name || ' ') + 'ball ';

	mesh.position.y		= 3
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	scene.add( mesh )

	mesh.useQuaternion	= true

	var bodyx	= new THREEx.CannonBody({
		mesh	: mesh,
		material: pMaterialEnemy,
	}).addTo(physicsWorld)
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})
	var body	= bodyx.origin

	// count the number of body of this type - used to fix startPosition
	var bodyCounter	= 0
	scene.traverse(function(object3d){
		var isBall	= / ball /.test(object3d.name) ? true : false
		if( !isBall )	return
		bodyCounter++
	})
	// setup origin	
	var origin	= new CANNON.Vec3()
	origin.set(-6*GAME.tileW, 6*GAME.tileW, -10*GAME.tileW)
	origin.z	*= Math.floor(bodyCounter % 2) === 1 ? 1 : -1
	origin.x	+= (Math.random()-0.5)*GAME.tileW*10;
	origin.y	+= bodyCounter * radius*2 * 1.5
	origin.z	+= (Math.random()-0.5)*GAME.tileW*5;
	// init origin
	body.position.set(origin.x, origin.y, origin.z)
	
	// kill player if touching the goal
	body.addEventListener("collide",function(event){
		var collidedObj	= event.with.userData.object3d
		var isGoal	= / goal /.test(collidedObj.name) ? true : false
		if( !isGoal )	return
		// reset all velocity
		body.velocity.set(0,0,0)
		body.angularVelocity.set(0,0,0)
		// set player position
		body.position.set(origin.x, origin.y, origin.z)
		// emite particle
		for(var i = 0; i < 10; i++){
			GAME.emitterImpactBall.emit(mesh.position)
		}
		// emit a sound
		sounds.playExplosion()
		// increase score
		yeller.dispatchEvent('increaseScore', 10)
		// emit a score
		GAME.emitterScore.emit(mesh.position, '10')
	})
	
	return;
}
