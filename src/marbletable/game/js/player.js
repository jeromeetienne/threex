var Player	= function(){
	var texture	= cache.getSet('texture.rocks', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/rocks.jpg');
		texture.wrapS	= texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 4, 4 );
		texture.anisotropy	= 16
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
		bumpScale: 0.01
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
	}).addTo(physicsWorld)

	var body	= bodyx.origin
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})

	body.angularDamping	= 0.98
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

	
	var impactEmitter	= new ImpactBallEmitter(scene)
	updateFcts.push(function(delta, now){
		impactEmitter.update(delta, now)
	})
	
	// make a sound on collision
	bodyx.origin.addEventListener("collide",function(event){
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
