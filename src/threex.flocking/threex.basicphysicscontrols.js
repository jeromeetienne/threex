var THREEx	= THREEx	|| {}

THREEx.BasicPhysicsControls	= function(object3d){
	// export object3d
	this.object3d	= object3d

	// physics constant
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	var acceleration= new THREE.Vector3()
	this.acceleration=acceleration
	var position	= object3d.position
	this.position	= position

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.applyForces	= function(){
		// handle physics
		velocity.multiplyScalar(this.opts.damping)
		velocity.add(acceleration)
		// honor maxSpeed
		if( velocity.length() > this.opts.maxSpeed ){
			velocity.setLength(this.opts.maxSpeed)
		}
		// update object3d position
		object3d.position.add(velocity)
		// update debug
		if( debug )	this.updateDebug()
		// reset acceleration
		acceleration.set(0,0,0)
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		computeForces functions stack					//
	//////////////////////////////////////////////////////////////////////////////////

	var onComputeForces	= []
	this.onComputeForces	= onComputeForces
	this.computeForces	= function(others){
		onComputeForces.forEach(function(fn){
			fn(others)
		})
	}
}
