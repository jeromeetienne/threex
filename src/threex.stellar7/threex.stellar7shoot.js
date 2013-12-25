var THREEx	= THREEx	|| {}

THREEx.Stellar7Shoot	= function(){
	// internal render function
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}

	// get the model
	var geometry	= new THREE.CubeGeometry( 0.1, 0.1, 0.1);
	var material	= new THREE.MeshNormalMaterial();
	var object3d	= new THREE.Mesh( geometry, material );
	this.object3d	= object3d
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		physics								//
	//////////////////////////////////////////////////////////////////////////////////
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	var tmpVector	= new THREE.Vector3()
	onRenderFcts.push(function(delta, now){
		tmpVector.copy(velocity).multiplyScalar(delta)
		object3d.position.add(tmpVector)
	})
}

THREEx.Stellar7Shoot.fromTank	= function(tankModel){
	var shoot	= new THREEx.Stellar7Shoot()
	shoot.object3d.position
		.copy(tankModel.object3d.position)
		.add(new THREE.Vector3(0,0.3, 0))

	var velocity	= new THREE.Vector3(0, 0, 20);
	var rotationY	= tankModel.baseMesh.rotation.y + tankModel.cannonMesh.rotation.y
	var matrix	= new THREE.Matrix4().makeRotationY(rotationY);
	velocity.applyMatrix4( matrix );
	shoot.velocity.copy(velocity)

	return shoot
}