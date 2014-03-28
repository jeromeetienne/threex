var THREEx	= THREEx	|| {}

THREEx.FlockingControls	= function(object3d, debug){
	// export object3d
	this.object3d	= object3d
	
	
	// physics constant
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	this.maxSpeed	= 1
	var acceleration= new THREE.Vector3()
	this.acceleration=acceleration
	var damping	= new THREE.Vector3(1,1,1)
	this.damping	= damping

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
	var neighbourRadius	= 2
	var separationRadius	= 0.5

	var maxAlignementForce	= 0.005

	var maxCohesionForce	= 0.001

	var maxSeparationForce	= 0.01

	damping.set(1,1,1).multiplyScalar(0.95)
	this.maxSpeed	= 0.05

	//////////////////////////////////////////////////////////////////////////////////
	//		cohesion							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others, controlsIdx){
		var positionSum	= new THREE.Vector3();
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// dont interact with myself
			if( others[i] === this )	continue;

			var other	= others[i];
			var distance	= other.object3d.position.distanceTo( object3d.position );

			if( distance > 0 && distance <= neighbourRadius ){
				positionSum.add( other.object3d.position );
				count++;
			}
		}
		// compute the average
		positionSum.divideScalar( count !== 0 ? count : 1);

		var cohesionForce	= positionSum.clone().sub(this.object3d.position);
		if( cohesionForce.length() > maxCohesionForce ){
			cohesionForce.setLength(maxCohesionForce)			
		}
		cohesionForce.multiplyScalar(maxCohesionForce)			

		// apply the cohesionForce to acceleration
		this.acceleration.add(cohesionForce)
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
			var distance	= other.object3d.position.distanceTo( object3d.position );

			if( distance > 0 && distance <= neighbourRadius ){
				velocitySum.add( other.velocity );
				count++;
			}
		}
		// compute the average
		velocitySum.divideScalar( count !== 0 ? count : 1);

		if( velocitySum.length() > maxAlignementForce ){
			velocitySum.setLength(maxAlignementForce)
		}
		
		// apply the force to acceleration
		this.acceleration.add(velocitySum)
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		separation							//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others, controlsIdx){
		var posSum	= new THREE.Vector3();
		var count	= 0;
		var repulse	= new THREE.Vector3();

		for(var i = 0; i < others.length; i++ ){
			// dont interact with myself
			if( others[i] === this )	continue;

			// set some variables
			var other	= others[i];
			var distance	= other.object3d.position.distanceTo( object3d.position );

			if( distance > 0 && distance <= separationRadius ){
				repulse.subVectors( object3d.position, other.object3d.position );
				repulse.normalize();
				repulse.divideScalar( distance );
				posSum.add( repulse );
				count++;
			}
		}
		// compute the average
		posSum.divideScalar( count !== 0 ? count : 1);
		posSum.multiplyScalar(1.2)
		if( posSum.length() > maxSeparationForce ){
			posSum.setLength(maxSeparationForce)			
		}
		// apply the force to acceleration
		this.acceleration.add(posSum)
	}.bind(this))


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	if( debug ){
		this.debugObject3d	= new THREE.Object3D()
		this.debugObject3d.position.z	= 0.2

		// velocity arrow
		var velocityArrow	= new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3, 1, 'blue')
		// this.debugObject3d.add(velocityArrow)
		
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
		this.debugObject3d.add(separationSphere)

		// neighboorSphere
		var geometry	= new THREE.SphereGeometry(neighbourRadius)
		var material	= new THREE.MeshBasicMaterial({
			color		: 'red',
			// wireframe	: true,
			side		: THREE.BackSide,
		})
		var neighboorSphere	= new THREE.Mesh(geometry, material)
		this.debugObject3d.add(neighboorSphere)
		
		function updateDebug(){
			// velocity
			velocityArrow.position.copy(object3d.position)
			// velocityArrow.setDirection(velocity.clone().multiplyScalar(300))
			velocityArrow.lookAt(object3d.position.clone().add(velocity.clone().multiplyScalar(300)))
			// velocityArrow.lookAt(object3d.position.clone().add(new THREE.Vector3(1,0,0)))
			velocityArrow.setLength(1)
			// velocityArrow.setLength(velocity.length()*20)
			
			// accelerationArrow.position.copy(object3d.position)
			// accelerationArrow.setDirection(acceleration.clone().multiplyScalar(3000))
			// accelerationArrow.setLength(acceleration.length()*100)

			neighboorSphere.position.copy(object3d.position)

			separationSphere.position.copy(object3d.position)
		}
	}
}
