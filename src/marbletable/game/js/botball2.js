var BotBall2	= function(opts){
	//////////////////////////////////////////////////////////////////////////////////
	//		options								//
	//////////////////////////////////////////////////////////////////////////////////
	
	opts	= opts	|| {}
	var ballAttraction	= opts.ballAttraction !== undefined ? opts.ballAttraction : 0.1
	var radius		= opts.radius !== undefined ? opts.radius : 1.5*GAME.tileW
	var material		= opts.material || cache.getSet('botball.material', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/planets/mars_1k_color.jpg');
		var material	= new THREE.MeshPhongMaterial({
			map	: texture,
		})
		return material
	})
	var respawnedEnabled	= opts.respawnedEnabled !== undefined ? opts.respawnedEnabled : false
	

	//////////////////////////////////////////////////////////////////////////////////
	//		update function							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		create THREE.Object3D						//
	//////////////////////////////////////////////////////////////////////////////////
	
	var geometry	= new THREE.SphereGeometry(radius, 32, 32)
	var object3d	= new THREE.Mesh(geometry, material)
	this.object3d	= object3d
	object3d.name	= (object3d.name || ' ') + 'ball ';
	object3d.receiveShadow	= true
	object3d.castShadow	= true
	scene.add( object3d )


	//////////////////////////////////////////////////////////////////////////////////
	//		add physics							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var bodyx	= new THREEx.CannonBody({
		mesh	: object3d,
		material: pMaterialEnemy,
	}).addTo(physicsWorld)
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})
	var body	= bodyx.body

	// setup origin	
	if( opts.position ){
		var origin	= opts.position.clone()
	}else{
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
	}
	// init body.position to its origin
	body.position.set(origin.x, origin.y, origin.z)
	
	// always be attracked by player
	updateFcts.push(function(delta, now){
		if( object3d.position.y > radius ){
			return
		}
		// compute the force
		var direction	= GAME.ball.position.clone().sub(object3d.position);
		direction.y	= 0
		var force	= direction.setLength(ballAttraction)
		// apply it
		bodyx.applyImpulse(force, delta)
	})
	
	// kill player if touching the goal
	body.addEventListener("collide",function(event){
		var collidedObj	= event.with.userData.object3d
		var isGoal	= / goal /.test(collidedObj.name) ? true : false
		if( !isGoal )	return

		// emitter particle
		for(var i = 0; i < 10; i++){
			GAME.emitterImpactBall.emit(object3d.position)
		}
		// emit a sound
		sounds.playExplosion()

		var scorePoints	= 1000;
		// increase score
		yeller.dispatchEvent('increaseScore', scorePoints)
		// emit a score
		GAME.emitterScore.emit(object3d.position, scorePoints)

		if( respawnedEnabled ){
console.log('ddddkkljklkj')
			// reset all velocity
			body.velocity.set(0,0,0)
			body.angularVelocity.set(0,0,0)
			// set player position
			body.position.set(origin.x, origin.y, origin.z)		
		}else{
			this.destroy()
			var nInstances	= 0
			scene.traverse(function(object3d){
				nInstances	+= / ball /.test(object3d.name) ? +1 : 0
			})
			if( nInstances === 0 )	yeller.dispatchEvent('gameWon')			
		}
	}.bind(this))

	this.destroy	= function(){
		physicsWorld.bodiesToRemove.push(body)
		scene.remove( object3d )
	}
}
