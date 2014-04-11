var THREEx	= THREEx	|| {}

THREEx.FlockingControls	= function(object3d, opts, debug){
	// export object3d
	this.object3d	= object3d
	this.debug	= debug !== undefined ? debug : false
	this.opts	= opts	|| {
		cohesionMaxLength	: 0.001,
		cohesionWeight		: 3,
		alignementMaxLength	: 0.005,
		alignementWeight	: 1,
		separationMaxLength	: 0.01,
		separationWeight	: 1,		
		
		neighbourRadius		: 1,
		separationRadius	: 0.5,
		maxSpeed		: 0.1,
		damping			: 1,
	}

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
	this.computeForces	= function(others){
		onComputeForces.forEach(function(fn){
			fn(others)
		})
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		cohesion							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others){
// return
		var positionSum	= new THREE.Vector3();
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// dont interact with myself
			if( others[i] === this )	continue;

			var other	= others[i];
			var distance	= other.position.distanceTo( position );

			if( distance > 0 && distance <= this.opts.neighbourRadius ){
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
		if( force.length() > this.opts.cohesionMaxLength ){
			force.setLength(this.opts.cohesionMaxLength)			
		}
		// honor weight for this force
		force.multiplyScalar(this.opts.cohesionWeight)

		// apply the force to acceleration
		this.acceleration.add(force)
	}.bind(this))


	//////////////////////////////////////////////////////////////////////////////////
	//		alignement							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others){
		var velocitySum	= new THREE.Vector3()
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// dont interact with myself
			if( others[i] === this )	continue;

			var other	= others[i];
			var distance	= other.position.distanceTo( position );

			if( distance > 0 && distance <= this.opts.neighbourRadius ){
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
		if( force.length() > this.opts.alignementMaxLength ){
			force.setLength(this.opts.alignementMaxLength)
		}
		// honor weight for this force
		force.multiplyScalar(this.opts.alignementWeight)
		// apply the force to acceleration
		this.acceleration.add(force)
	}.bind(this))
	
	//////////////////////////////////////////////////////////////////////////////////
	//		separation							//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others){
		var repulse	= new THREE.Vector3();
		var positionSum	= new THREE.Vector3();
		var count	= 0;

		for(var i = 0; i < others.length; i++ ){
			// dont interact with myself
			if( others[i] === this )	continue;

			// set some variables
			var other	= others[i];
			var distance	= other.position.distanceTo( position );

			if( distance > 0 && distance <= this.opts.separationRadius ){
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
		if( force.length() > this.opts.separationMaxLength ){
			force.setLength(this.opts.separationMaxLength)			
		}
		// honor weight for this force
		force.multiplyScalar(this.opts.separationWeight)
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
		this.debugObject3d.add(accelerationArrow)
		
		// separationSphere		
		var geometry	= new THREE.SphereGeometry(1)
		var material	= new THREE.MeshBasicMaterial({
			color		: 'green',
			// wireframe	: true,
			side		: THREE.BackSide,
		})
		var separationSphere	= new THREE.Mesh(geometry, material)
		this.debugObject3d.add(separationSphere)

		// neighbourSphere
		var geometry	= new THREE.SphereGeometry(1)
		var material	= new THREE.MeshBasicMaterial({
			color		: 'red',
			// wireframe	: true,
			side		: THREE.BackSide,
		})
		var neighbourSphere	= new THREE.Mesh(geometry, material)
		this.debugObject3d.add(neighbourSphere)
		
		this.updateDebug	= function(){
			// velocity
			velocityArrow.position.copy(object3d.position)
			velocityArrow.setDirection(velocity.clone().normalize())
			velocityArrow.setLength(velocity.length()*10)
			// velocityArrow.lookAt(object3d.position.clone().add(velocity).normalize())
			// velocityArrow.lookAt(object3d.position.clone().add(new THREE.Vector3(1,0,0)))
			// velocityArrow.setLength(1)
			
			accelerationArrow.position.copy(object3d.position)
			accelerationArrow.setDirection(acceleration.clone().multiplyScalar(3000))
			accelerationArrow.setLength(acceleration.length()*100)

			neighbourSphere.position.copy(object3d.position)
			neighbourSphere.scale.set(1,1,1).multiplyScalar(this.opts.neighbourRadius)

			separationSphere.position.copy(object3d.position)
			separationSphere.scale.set(1,1,1).multiplyScalar(this.opts.separationRadius)
		}
	}
}
