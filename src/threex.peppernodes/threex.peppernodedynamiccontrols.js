var THREEx	= THREEx	|| {}

THREEx.PepperNodeDynamicControls	= function(object3d){
	// export object3d
	this.object3d	= object3d
	var current	= this
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


	//////////////////////////////////////////////////////////////////////////////////
	//		focus node goto center						//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others){
		var node	= current.object3d.userData.node

		// this force is applied generation === 1 aka focus node
		var isFocusedNode	= node.generation === 1 ? true : false
		if( isFocusedNode === false )	return;

		// honor weight for this force
		var force	= new THREE.Vector3()
			.copy( current.position )
			// .normalize()
			.multiplyScalar( -0.2 )
		// apply the force to acceleration
		current.acceleration.add(force)
	})


	//////////////////////////////////////////////////////////////////////////////////
	//		spring link							//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others){
		var node	= current.object3d.userData.node
// return

		// this force is applied only on the child
		var hasParent	= node.parent ? true : false
		if( hasParent === false )	return;

		// set some variables
		var other		= node.parent
		var otherControls	= node.parent.object3d.userData.controls
		var targetDist		= 400/node.generation
		var actualDist		= other.position.distanceTo( current.position );

		var targetPos	= new THREE.Vector3()
		targetPos.subVectors( other.position, current.position ).setLength(targetDist)

		var distance	= targetPos.distanceTo( current.position );
		var deltaDist	= actualDist - targetDist

		// honor weight for this force
		var force	= new THREE.Vector3()
			.subVectors( targetPos, current.position )
			.normalize()
			.multiplyScalar( deltaDist  )
			.multiplyScalar( 0.005 )
		// apply the force to acceleration
		current.acceleration.add(force)
		otherControls.acceleration.sub(force)
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		separation							//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others){
// return

		var node	= current.object3d.userData.node
		var vectorSum	= new THREE.Vector3();
		var vectorCount	= 0

		var vectorRepulse	= new THREE.Vector3();
		others.forEach(function(other){
			// dont apply on yourself
			if( other === current )	return

			// set some variables
			var distance	= other.position.distanceTo( current.position );

			var radius	= 300/node.generation
			if( distance > 0 && distance <= radius ){
				vectorRepulse.subVectors( current.position, other.position );
				vectorRepulse.normalize();
				vectorRepulse.divideScalar( distance * node.generation );
				vectorSum.add( vectorRepulse );
				vectorCount++;
			}		
		})

		// do nothing if no neighbour
		if( vectorCount === 0 )	return
		// compute the average
		vectorSum.divideScalar( vectorCount );
		var force	= vectorSum
		// honor weight for this force
		force.multiplyScalar(5)
		// apply the force to acceleration
		current.acceleration.add(force)
	})
}
