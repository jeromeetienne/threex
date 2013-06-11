var Player	= function(){
	var texture	= cache.getSet('texture.player.rocks', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/rocks.jpg');
		var texture	= THREE.ImageUtils.loadTexture('images/wood.jpg');
		var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg');
		var texture	= THREE.ImageUtils.loadTexture('images/water.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/venusmap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/neptunemap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/jupitermap.jpg');
		//var texture	= THREE.ImageUtils.loadTexture('images/tile01.jpg');
		var texture	= THREEx.createPoolBall.ballTexture('9', true, "#FDD017", 1024);

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

	mesh.useQuaternion	= true
	var bodyx	= new THREEx.CannonBody({
		mesh	: mesh,
		material: pMaterialPlayer,
	}).addTo(physicsWorld)
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})

if( true ){
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
	mesh.material.reflectivity =0.2
}


	var body	= bodyx.origin

	body.angularDamping	= 0.5
	body.linearDamping	= 0.5
	
	// ugly way to fix a missing 'onLoad()'
	// 
	setTimeout(function timeoutCb(){
		if( !sounds.rollBuffer ){
			setTimeout(timeoutCb, 100)
			return;
		}
		sounds.playRoll(mesh)
	}, 100)

	// TODO put that at the global game level
	var impactEmitter	= new ImpactBallEmitter(scene)
	updateFcts.push(function(delta, now){
		impactEmitter.update(delta, now)
	})
	
	// make a sound on collision
	body.addEventListener("collide",function(event){
		if( !sounds )	return;
		var speed	= body.velocity.norm();
		var volume	= speed/5;
		sounds.playKick(volume);

		var nEmit	= 0
		if( speed < 1.5 )	nEmit = 1;
		else if( speed < 4.5 )	nEmit = 2;
		else if( speed < 6.5 )	nEmit = 4;
		else			nEmit = 8;
		for(var i = 0; i < nEmit; i++){
			impactEmitter.emit(mesh.position)		
		}
	})
}
