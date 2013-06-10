var PlayerControls	= function(ball){
	this.disable	= false
	this.update	= function(delta, now){
		// if disablePlayerControls is true, return now
		if( this.disable )	return
		
		// prevent controls if the ball isnt on the ground
//		if( ball.position.y > ball.geometry.radius )	return

		var force	= new THREE.Vector3()
		if( keyboard.pressed('right') ){
			force.x	= +1
		}else if( keyboard.pressed('left') ){
			force.x	= -1
		}
		if( keyboard.pressed('up') ){
			force.z	= -1
		}else if( keyboard.pressed('down') ){
			force.z	= +1
		}
		force.multiplyScalar(1)

		// compute cameraPos and ballPos world
		camera.updateMatrixWorld();
		var cameraPos	= new THREE.Vector3().getPositionFromMatrix( camera.matrixWorld )
		ball.updateMatrixWorld();
		var ballPos	= new THREE.Vector3().getPositionFromMatrix( ball.matrixWorld )

		// rotate the force according to camera position from ball position
		// - thus arrow are relative to what the user see
		var deltaPos	= ballPos.clone().sub(cameraPos)
		var forceAngle	= - Math.PI/2 - Math.atan2(deltaPos.z, deltaPos.x)
		var matrix	= new THREE.Matrix4().makeRotationY( forceAngle )
		force.applyMatrix4( matrix )

		var cannonBody	= ball.userData.cannonBody
		cannonBody.applyImpulse(force, delta)
	}

	// jump on space
	keyboard.domElement.addEventListener('keydown', function(event){
		if( keyboard.eventMatches(event, 'escape') === false )	return
		yeller.dispatchEvent('killPlayer')
	})

	// jump on space
	keyboard.domElement.addEventListener('keydown', function(event){
		// if disablePlayerControls is true, return now
		if( this.disable )	return;		

		if( keyboard.eventMatches(event, 'space') === false )	return

		var body	= ball.userData.cannonBody.origin
		if( Math.abs(body.velocity.y) > 0.1 )	return;			

		sounds.playEatPill()

		var cannonBody	= ball.userData.cannonBody
		cannonBody.applyImpulse(new THREE.Vector3(0, 1, 0), 1)
	})
}