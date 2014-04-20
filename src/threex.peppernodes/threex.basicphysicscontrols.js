var THREEx	= THREEx	|| {}

THREEx.BasicPhysicsControls	= function(object3d){
	// export object3d
	this.object3d	= object3d

	// physics constant
	var position	= object3d.position
	this.position	= position
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	var acceleration= new THREE.Vector3()
	this.acceleration=acceleration
	var damping	= new THREE.Vector3(1,1,1)
	this.damping	= damping

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.applyForces	= function(){
		// handle physics
		velocity.multiply(this.damping)
		velocity.add(acceleration)
		// update object3d position
		object3d.position.add(velocity)
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
