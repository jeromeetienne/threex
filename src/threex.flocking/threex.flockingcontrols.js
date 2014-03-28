var THREEx	= THREEx	|| {}

THREEx.FlockingControls	= function(object3d, debug){
	// export object3d
	this.object3d	= object3d
	
	this.debug	= debug ? true : false
	
	// physics constant
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	this.maxSpeed	= 1
	var acceleration= new THREE.Vector3()
	this.acceleration=acceleration
	var damping	= new THREE.Vector3(1,1,1)
	this.damping	= damping
	
	var position	= object3d.position
	this.position	= position

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.applyForces	= function(){
		// handle physics
		velocity.multiply(damping)
		velocity.add(acceleration)
		// honor maxSpeed
		if( velocity.length() > this.maxSpeed ){
			velocity.setLength(this.maxSpeed)
		}
		// update object3d position
		object3d.position.add(velocity)
		// update debug
		if( debug )	updateDebug()
		// reset acceleration
		acceleration.set(0,0,0)
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		computeForces functions stack					//
	//////////////////////////////////////////////////////////////////////////////////

	var onComputeForces	= []
	this.computeForces	= function(others, controlsIdx){
		onComputeForces.forEach(function(fn){
			fn(others, controlsIdx)
		})
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		constant							//
	//////////////////////////////////////////////////////////////////////////////////
	var neighbourRadius	= 1
	var separationRadius	= 0.5
	this.maxSpeed		= 0.1
	// damping.set(1,1,1).multiplyScalar(0.95)

	var opts	= {
		cohesion	: {
			maxLength	: 0.001,
			weight		: 3,
		},
		alignement	: {
			maxLength	: 0.005,
			weight		: 1,
		},
		separation	: {
			maxLength	: 0.01,
			weight		: 1,
		},
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		cohesion							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others, controlsIdx){
// return
		var positionSum	= new THREE.Vector3();
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// dont interact with myself
			if( others[i] === this )	continue;

			var other	= others[i];
			var distance	= other.position.distanceTo( position );

			if( distance > 0 && distance <= neighbourRadius ){
				positionSum.add( other.position );
				count++;
			}
		}
		// do nothing if no neighbour
		if( count === 0 )	return

		// average the position
		positionSum.divideScalar(count);

		var force	= positionSum.clone().sub(this.position);
		// honor maximum length for this force		
		if( force.length() > opts.cohesion.maxLength ){
			force.setLength(opts.cohesion.maxLength)			
		}
		// honor weight for this force
		force.multiplyScalar(opts.cohesion.weight)

		// apply the force to acceleration
		this.acceleration.add(force)
	}.bind(this))


	//////////////////////////////////////////////////////////////////////////////////
	//		alignement							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others, controlsIdx){
		var velocitySum	= new THREE.Vector3()
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// dont interact with myself
			if( others[i] === this )	continue;

			var other	= others[i];
			var distance	= other.position.distanceTo( position );

			if( distance > 0 && distance <= neighbourRadius ){
				velocitySum.add( other.velocity );
				count++;
			}
		}
		
		// do nothing if no neighbour
		if( count === 0 )	return

		// compute the average
		velocitySum.divideScalar( count );
		var force	= velocitySum
		// honor maximum bound
		if( force.length() > opts.alignement.maxLength ){
			force.setLength(opts.alignement.maxLength)
		}
		// honor weight for this force
		force.multiplyScalar(opts.alignement.weight)
		// apply the force to acceleration
		this.acceleration.add(force)
	}.bind(this))
	
	//////////////////////////////////////////////////////////////////////////////////
	//		separation							//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others, controlsIdx){
		var repulse	= new THREE.Vector3();
		var positionSum	= new THREE.Vector3();
		var count	= 0;

		for(var i = 0; i < others.length; i++ ){
			// dont interact with myself
			if( others[i] === this )	continue;

			// set some variables
			var other	= others[i];
			var distance	= other.position.distanceTo( position );

			if( distance > 0 && distance <= separationRadius ){
				repulse.subVectors( position, other.position );
				repulse.normalize();
				repulse.divideScalar( distance );
				positionSum.add( repulse );
				count++;
			}
		}
		// do nothing if no neighbour
		if( count === 0 )	return
		// compute the average
		positionSum.divideScalar( count );
		var force	= positionSum
		// honor maximum bound
		if( force.length() > opts.separation.maxLength ){
			force.setLength(opts.separation.maxLength)			
		}
		// honor weight for this force
		force.multiplyScalar(opts.separation.weight)
		// apply the force to acceleration
		this.acceleration.add(force)
	}.bind(this))


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	if( debug ){
		this.debugObject3d	= new THREE.Object3D()
		this.debugObject3d.position.z	= 0.1

		// velocity arrow
		var velocityArrow	= new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3, 1, 'blue')
		this.debugObject3d.add(velocityArrow)
		
		// acceleration arrow
		var accelerationArrow	= new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3, 1, 'green')
		// this.debugObject3d.add(accelerationArrow)
		
		// separationSphere		
		var geometry	= new THREE.SphereGeometry(separationRadius)
		var material	= new THREE.MeshBasicMaterial({
			color		: 'green',
			wireframe	: true,
			side		: THREE.BackSide,
		})
		var separationSphere	= new THREE.Mesh(geometry, material)
		// this.debugObject3d.add(separationSphere)

		// neighboorSphere
		var geometry	= new THREE.SphereGeometry(neighbourRadius)
		var material	= new THREE.MeshBasicMaterial({
			color		: 'red',
			wireframe	: true,
			// side		: THREE.BackSide,
		})
		var neighboorSphere	= new THREE.Mesh(geometry, material)
		// this.debugObject3d.add(neighboorSphere)
		
		function updateDebug(){
			// velocity
			velocityArrow.position.copy(object3d.position)
			velocityArrow.setDirection(velocity.clone().normalize())
			velocityArrow.setLength(velocity.length()*10)
			// velocityArrow.lookAt(object3d.position.clone().add(velocity).normalize())
			// velocityArrow.lookAt(object3d.position.clone().add(new THREE.Vector3(1,0,0)))
			// velocityArrow.setLength(1)
			
			// accelerationArrow.position.copy(object3d.position)
			// accelerationArrow.setDirection(acceleration.clone().multiplyScalar(3000))
			// accelerationArrow.setLength(acceleration.length()*100)

			neighboorSphere.position.copy(object3d.position)

			separationSphere.position.copy(object3d.position)
		}
	}
}
