var Player	= function(opts){
	// handle default arguments
	opts	= opts	|| {}
	opts.liveMirror	= opts.liveMirror !== undefined ? opts.liveMirror : true
	// init texture
	var texture	= cache.getSet('texture.player.rocks', function(){
		// var texture	= THREE.ImageUtils.loadTexture('images/rocks.jpg');
		// var texture	= THREE.ImageUtils.loadTexture('images/wood.jpg');
		// var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg');
		// var texture	= THREE.ImageUtils.loadTexture('images/water.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/venusmap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/neptunemap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/jupitermap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/tile01.jpg');
		var texture	= THREEx.createPoolBall.ballTexture('9', true, "#FDD017", 1024);
		// var texture	= THREEx.createPoolBall.ballTexture('0', true, "#ffffff", opts.textureW);
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
		bumpScale: 0.02,
		//color	: 'cyan',
	})
	var mesh	= new THREE.Mesh(geometry, material)
	this.mesh	= mesh

	mesh.position.y	= 3
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	scene.add( mesh )

	mesh.name	= (mesh.name || ' ') + 'player ';

	var bodyx	= new THREEx.CannonBody({
		mesh	: mesh,
		material: pMaterialPlayer,
	}).addTo(physicsWorld)
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})

	// to get a mirror ball
	if( opts.liveMirror ){
		// create the camera
		var cubeCamera	= new THREE.CubeCamera( 0.001, 1000, 512 );
		scene.add( cubeCamera )
		updateFcts.push(function(delta, now){
			cubeCamera.position.copy(mesh.position)
			mesh.visible	= false
			cubeCamera.updateCubeMap(renderer, scene);
			mesh.visible	= true
		})
		mesh.material.envMap	= cubeCamera.renderTarget
		mesh.material.reflectivity	= 0.2
	}

	var body	= bodyx.body

	body.angularDamping	= 0.9
	// body.linearDamping	= 0.5
	
	// ugly way to fix a missing 'onLoad()'
	// FIXME possible now with the new webaudiox soundbank
	setTimeout(function timeoutCb(){
		if( !sounds.rollBuffer ){
			setTimeout(timeoutCb, 100)
			return;
		}
		//sounds.playRoll(mesh)
	}, 100)
	// update the listener on this mesh
	soundsBank.soundEnabled	&& soundsBank.setListenerUpdater(mesh)


	updateFcts.push(function(delta, now){
		var speed	= body.velocity.norm();
		if( speed < 4.5 )	return
		//GAME.emitterSpeedTrail.emitThrottle(mesh.position, 1/(10 * delta))
		GAME.emitterBlueTrail.emit(mesh.position)
	})
	
	// make a sound on collision
	body.addEventListener("collide",function(event){
		if( !sounds )	return;
		var speed	= body.velocity.norm();
		var volume	= speed/5;
		//sounds.playKick(volume);
	})
	// particke of collision
	body.addEventListener("collide",function(event){
		var speed	= body.velocity.norm();
		if( speed < 1.5 )	var nEmit = 1;
		else if( speed < 4.5 )	var nEmit = 2;
		else if( speed < 6.5 )	var nEmit = 4;
		else			var nEmit = 8;
		for(var i = 0; i < nEmit; i++){
			GAME.emitterImpactBall.emit(mesh.position)		
		}
	})
	// kill player if touching the goal
	body.addEventListener("collide",function(event){
		var collidedMesh= event.with.userData.object3d
		var isGoal	= / goal /.test(collidedMesh.name) ? true : false
		if( !isGoal )	return
		// kill the player
		yeller.dispatchEvent('killPlayer')
		GAME.emitterScore.emit(mesh.position, '!!')
	})
}
