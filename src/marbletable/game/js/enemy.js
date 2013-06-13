var Enemy	= function(){
	var texture	= cache.getSet('texture.enemy', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/rocks.jpg');
		var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg');
		var texture	= THREE.ImageUtils.loadTexture('images/sharksphere.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/venusmap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/neptunemap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/jupitermap.jpg');
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
		bumpScale: 0.05
	})
	var mesh	= new THREE.Mesh(geometry, material)
	this.object3d	= mesh

	mesh.position.y	= 3
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	scene.add( mesh )

	mesh.useQuaternion	= true
	var bodyx	= new THREEx.CannonBody({
		mesh	: mesh,
		material: pMaterialEnemy,
	}).addTo(physicsWorld)
	var body	= bodyx.origin

	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})

	// body.angularDamping	= 0
	// body.linearDamping	= 0
	
	// make a sound on collision
	body.addEventListener("collide",function(event){
		if( !sounds )	return;
		var speed	= body.velocity.norm();
		var volume	= speed/5;
		sounds.playKick(volume);
	})

	updateFcts.push(function(delta, now){
		// compute the force
		var direction	= GAME.ball.position.clone().sub(mesh.position);
		direction.y	= 0
		var force	= direction.setLength(0.6)
		// var length	= direction.length()*1-2
		// length	= Math.pow(length, 2)
		// var force	= direction.setLength(length)
		
		var cannonBody	= mesh.userData.cannonBody
		cannonBody.applyImpulse(force, delta)
	});	

}
