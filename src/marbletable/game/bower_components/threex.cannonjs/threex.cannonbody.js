var THREEx = THREEx || {}

THREEx.CannonBody	= function(opts){
	// handle parameter polymorphism
	if( arguments.length === 1 && opts instanceof THREE.Object3D )	opts	= {mesh:opts};
	// handle parameters optional value
	opts		= opts	|| {};
	var mesh	= opts.mesh !== undefined	? opts.mesh	: console.assert(false)
	var mass	= opts.mass !== undefined 	? opts.mass	: null;
	var shape	= opts.shape !== undefined 	? opts.shape	: null;
	var material	= opts.material !== undefined	? opts.material	: undefined;
	var geometry	= opts.geometry || mesh.geometry
	var cannon2three= opts.cannon2three !== undefined ? opts.cannon2three : true
	// 
	if( geometry instanceof THREE.SphereGeometry ){
		geometry.computeBoundingBox()
		var boundingBox	= geometry.boundingBox
		var radius	= ((boundingBox.max.x - boundingBox.min.x)* mesh.scale.x) /2
		if( shape === null )	shape	= new CANNON.Sphere(radius)
		if( mass === null )	mass	= 4/3 * Math.PI * Math.pow(radius, 3)
	}else if( geometry instanceof THREE.CubeGeometry ){
		geometry.computeBoundingBox()
		var boundingBox	= geometry.boundingBox
		var width 	= (boundingBox.max.x - boundingBox.min.x) * mesh.scale.x
		var height 	= (boundingBox.max.y - boundingBox.min.y) * mesh.scale.y
		var depth 	= (boundingBox.max.z - boundingBox.min.z) * mesh.scale.z		
		if( shape === null )	shape	= new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2))
		if( mass === null )	mass	= Math.pow(width*width + height*height + depth*depth, 1/3)
	}else if( geometry instanceof THREE.PlaneGeometry ){
		if( shape === null )	shape	= new CANNON.Plane()
		if( mass === null ){
			geometry.computeBoundingBox()
			var boundingBox	= geometry.boundingBox
			var width 	= (boundingBox.max.x - boundingBox.min.x) * mesh.scale.x
			var height 	= (boundingBox.max.y - boundingBox.min.y) * mesh.scale.y
			var depth 	= (boundingBox.max.z - boundingBox.min.z) * mesh.scale.z			
			mass	= Math.pow(width*width + height*height, 1/2)		
		}
	}else	console.assert(false, 'unknown geometry type')

	var body	= new CANNON.RigidBody(mass, shape, material)
	this.body	= body
	// @TODO to remove
	Object.defineProperty(this, 'origin', {
		get	: function(){
			console.warn('THREEx.cannonBody depreciate .origin, use .body instead')
			return body
		}
	})
	
	body.userData	= body.userData	|| {}
	body.userData.object3d	= mesh

	this.mesh	= mesh

	// use quaternion
	mesh.userData.cannonBody= this

	// copy mesh.position to body.position
	body.position.x		= mesh.position.x
	body.position.y		= mesh.position.y
	body.position.z		= mesh.position.z
	// copy mesh.quaternion to body.quaternion
	body.quaternion.x	= mesh.quaternion.x
	body.quaternion.y	= mesh.quaternion.y
	body.quaternion.z	= mesh.quaternion.z
	body.quaternion.w	= mesh.quaternion.w

	if( cannon2three ){
		this.update	= function(delta, now){
			// copy body.position to mesh.position
			mesh.position.x		= body.position.x
			mesh.position.y		= body.position.y
			mesh.position.z		= body.position.z
			// copy body.quaternion to mesh.quaternion
			mesh.quaternion.x	= body.quaternion.x;
			mesh.quaternion.y	= body.quaternion.y;
			mesh.quaternion.z	= body.quaternion.z;
			mesh.quaternion.w	= body.quaternion.w;
		}
	}else{
		
		var pos
		this.update	= function(delta, now){
			// get position/quaternion in worldMatrix
			mesh.updateMatrixWorld()
			var position	= new THREE.Vector3().getPositionFromMatrix(mesh.matrixWorld)
			var quaternion	= new THREE.Quaternion().setFromRotationMatrix(mesh.matrixWorld)
			// copy mesh.position to body.position
			body.position.x		= position.x
			body.position.y		= position.y
			body.position.z		= position.z
			// copy mesh.quaternion to body.quaternion
			body.quaternion.x	= quaternion.x
			body.quaternion.y	= quaternion.y
			body.quaternion.z	= quaternion.z
			body.quaternion.w	= quaternion.w
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		Helpers								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.CannonBody.prototype.applyImpulse = function(force, deltaTime) {
	var ball	= this.mesh
	var impulse	= force.clone().multiplyScalar(deltaTime)
	// apply the force to the center of the ball
	ball.updateMatrixWorld();
	// get world position
	var ballPosition= new THREE.Vector3().getPositionFromMatrix( ball.matrixWorld )

	// do an impulse to the ball
	var body	= ball.userData.cannonBody.body
	var worldPoint	= new CANNON.Vec3(ballPosition.x, ballPosition.y, ballPosition.z)
	var impulse	= new CANNON.Vec3(impulse.x, impulse.y, impulse.z)
	body.applyImpulse(impulse, worldPoint);
}

THREEx.CannonBody.prototype.applyForce = function(force) {
	var ball	= this.mesh
	// apply the force to the center of the ball
	ball.updateMatrixWorld();
	// get world position
	var ballPosition= new THREE.Vector3().getPositionFromMatrix( ball.matrixWorld )

	// do an impulse to the ball
	var body	= ball.userData.cannonBody.body
	var worldPoint	= new CANNON.Vec3(ballPosition.x, ballPosition.y, ballPosition.z)
	var cforce	= new CANNON.Vec3(force.x, force.y, force.z)
	body.applyForce(cforce, worldPoint);
}

//////////////////////////////////////////////////////////////////////////////////
//		Helpers								//
//////////////////////////////////////////////////////////////////////////////////


THREEx.CannonBody.prototype.addTo = function(worldx) {
	worldx.world.add(this.body)
	return this;
};

THREEx.CannonBody.prototype.removeFrom = function(worldx) {
	worldx.world.remove(this.body)
	return this;
};