var BotBouncer	= function(){
	var texture	= cache.getSet('texture.bouncer', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/rocks.jpg');
		// var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg');
		// var texture	= THREE.ImageUtils.loadTexture('images/sharksphere.jpg');
		 var texture	= THREE.ImageUtils.loadTexture('images/venusmap.jpg');
		// var texture	= THREE.ImageUtils.loadTexture('images/neptunemap.jpg');
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
	var geometry	= new THREE.TorusGeometry(radius-0.45*GAME.tileW, 0.45*GAME.tileW, 32, 16)
	var material	= new THREE.MeshPhongMaterial({
		color		: new THREE.Color().setHSL(Math.random(),1,0.5),
		map		: texture,
		bumpMap		: texture,
		bumpScale	: 0.001
	})
	var mesh	= new THREE.Mesh(geometry, material)
	this.object3d	= mesh

	mesh.receiveShadow	= true
	mesh.castShadow		= true
	scene.add( mesh )

	mesh.useQuaternion	= true
	mesh.lookAt(new THREE.Vector3(0,1,0))	

	var bodyx	= new THREEx.CannonBody({
		mesh	: mesh,
		mass	: 0,
		geometry: new THREE.SphereGeometry(radius, 32, 32),
	}).addTo(physicsWorld)
	var body	= bodyx.origin
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})

	// make a sound on collision
	body.addEventListener("collide",function(event){
		// play a sound
		sounds.playBounce()

		// emite particle
		for(var i = 0; i < 10; i++){
			GAME.emitterImpactBall.emit(mesh.position)
		}

		// animation of mesh
		var tweenForward= new TWEEN.Tween({
			scale	: 1
		}).easing(TWEEN.Easing.Bounce.Out).to({
			scale	: 2
		}, 300).onUpdate(function(){
			mesh.scale.set(1,1,1).multiplyScalar(this.scale)
		})
		var tweenBack	= new TWEEN.Tween({
			scale	: 2
		}).easing(TWEEN.Easing.Elastic.In).to({
			scale	: 1
		}, 500).onUpdate(function(){
			mesh.scale.set(1,1,1).multiplyScalar(this.scale)
		})
		tweenForward.chain(tweenBack)
		tweenForward.start()

		// zero velocity/angularVelocity for collidedBody
		var collidedBody= event.with
		collidedBody.velocity.set(0,0,0)
		collidedBody.angularVelocity.set(0,0,0)

		// apply force to collidedMesh
		var collidedMesh= event.with.userData.object3d
		var direction	= collidedMesh.position.clone().sub(mesh.position);
		direction.y	= 0
		var force	= direction.setLength(50)
		var cannonBody	= collidedMesh.userData.cannonBody
		cannonBody.applyForce(force)
	})
}
