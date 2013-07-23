var PlayerControls	= function(ball){
	this.disable	= false
	
	this.update	= function(delta, now){
		// if disablePlayerControls is true, return now
		if( this.disable )	return
			
		var input	= {};
		input.left	= false
		input.right	= false
		input.up	= false
		input.down	= false
		// support keyboard
		input.left	= input.left	|| keyboard.pressed('left')
					|| keyboard.pressed('a')
					|| keyboard.pressed('q')
		input.right	= input.right	|| keyboard.pressed('right')
					|| keyboard.pressed('d')	
		input.up	= input.up	|| keyboard.pressed('up')
					|| keyboard.pressed('w')
					|| keyboard.pressed('z')
		input.down	= input.down	|| keyboard.pressed('down')
					|| keyboard.pressed('s')
		// support joystick
		input.left	|= input.left	|| GAME.joystick.left()
		input.right	|= input.right	|| GAME.joystick.right()
		input.up	|= input.up	|| GAME.joystick.up()
		input.down	|= input.down	|| GAME.joystick.down()

		// prevent controls if the ball isnt on the ground
//		if( ball.position.y > ball.geometry.radius )	return

		var force	= new THREE.Vector3()
		if( input.right ){
			force.x	= +1
		}else if( input.left ){
			force.x	= -1
		}
		if( input.up ){
			force.z	= -1
		}else if( input.down ){
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

		var body	= ball.userData.cannonBody.body
		if( Math.abs(body.velocity.y) > 0.1 )	return;			

		sounds.playEatPill()

		var cannonBody	= ball.userData.cannonBody
		cannonBody.applyImpulse(new THREE.Vector3(0, 1, 0), 1)
	})
}