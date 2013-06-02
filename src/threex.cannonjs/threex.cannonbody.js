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

	// 
	if( mesh.geometry instanceof THREE.SphereGeometry ){
		mesh.geometry.computeBoundingBox()
		var boundingBox	= mesh.geometry.boundingBox
		var radius	= ((boundingBox.max.x - boundingBox.min.x)* mesh.scale.x) /2
		if( shape === null )	shape	= new CANNON.Sphere(radius)
		if( mass === null )	mass	= 4/3 * Math.PI * Math.pow(radius, 3)
	}else if( mesh.geometry instanceof THREE.CubeGeometry ){
		mesh.geometry.computeBoundingBox()
		var boundingBox	= mesh.geometry.boundingBox
		var width 	= (boundingBox.max.x - boundingBox.min.x) * mesh.scale.x
		var height 	= (boundingBox.max.y - boundingBox.min.y) * mesh.scale.y
		var depth 	= (boundingBox.max.z - boundingBox.min.z) * mesh.scale.z		
		if( shape === null )	shape	= new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2))
		if( mass === null )	mass	= Math.pow(width*width + height*height + depth*depth, 1/3)
	}else if( mesh.geometry instanceof THREE.PlaneGeometry ){
		if( shape === null )	shape	= new CANNON.Plane()
		if( mass === null ){
			mesh.geometry.computeBoundingBox()
			var boundingBox	= mesh.geometry.boundingBox
			var width 	= (boundingBox.max.x - boundingBox.min.x) * mesh.scale.x
			var height 	= (boundingBox.max.y - boundingBox.min.y) * mesh.scale.y
			var depth 	= (boundingBox.max.z - boundingBox.min.z) * mesh.scale.z			
			mass	= Math.pow(width*width + height*height, 1/2)		
		}
	}else	console.assert(false)


	var body	= new CANNON.RigidBody(mass, shape, material)
	this.origin	= body

	// sanity check - if the object use Euler, check it is 0 vectors
	console.assert(mesh.useQuaternion === true || 
		(  mesh.rotation.x === 0
		&& mesh.rotation.y === 0
		&& mesh.rotation.z === 0), 'mesh MUST use quaternion')
	// use quaternion
	mesh.useQuaternion	= true
	mesh.userData.cannonBody= this

	body.position.x		= mesh.position.x;
	body.position.y		= mesh.position.y;
	body.position.z		= mesh.position.z;

	body.quaternion.x	= mesh.quaternion.x;
	body.quaternion.y	= mesh.quaternion.y;
	body.quaternion.z	= mesh.quaternion.z;
	body.quaternion.w	= mesh.quaternion.w;


	this.update	= function(delta, now){
		// TODO should i copy the mesh local position or global position
		// global seems more likely

		mesh.position.copy( body.position );
		mesh.quaternion.copy( body.quaternion );
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		Helpers								//
//////////////////////////////////////////////////////////////////////////////////


THREEx.CannonBody.prototype.addTo = function(physicsWorld) {
	physicsWorld.origin.add(this.origin)
	return this;
};

THREEx.CannonBody.prototype.removeFrom = function(physicsWorld) {
	physicsWorld.origin.remove(this.origin)
	return this;
};