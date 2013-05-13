var THREEx = THREEx || {}

THREEx.CannonBody	= function(mesh){
console.log(mesh)
	if( mesh.geometry instanceof THREE.SphereGeometry ){
		var radius	= 1	// TODO get that from boundingbox
		var shape	= new CANNON.Sphere(radius)
		var mass	= 1	// compute that with formula
		var body	= new CANNON.RigidBody(mass, shape)		
	}else	console.assert(false)
	this.origin	= body

	mesh.useQuaternion	= true
	mesh.userData.cannonBody= this
	
	this.update	= function(delta, now){
		// TODO should i copy the mesh local position or global position
		// global seems more likely
		body.position.copy(mesh.position);
		body.quaternion.copy(mesh.quaternion);
	}
}