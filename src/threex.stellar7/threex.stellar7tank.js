var THREEx	= THREEx	|| {}

THREEx.Stellar7Tank	= function(){
	// internal render function
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		model								//
	//////////////////////////////////////////////////////////////////////////////////
	
	// get the base
	var geometry	= new THREE.CubeGeometry( 0.5, 0.2, 1);
	var material	= new THREE.MeshNormalMaterial();
	var baseMesh	= new THREE.Mesh( geometry, material );
	this.object3d	= baseMesh
	
	// get the turret
	var geometry	= new THREE.CubeGeometry( 0.3, 0.15, 0.3);
	var material	= new THREE.MeshNormalMaterial();
	var cannonMesh	= new THREE.Mesh( geometry, material );
	baseMesh.add(cannonMesh)
	cannonMesh.position.set(0,0.2, -0.2)
	this.cannonMesh	= cannonMesh

	// get the cannon
	var geometry	= new THREE.CylinderGeometry( 0.05, 0.05, 0.3 );
	var material	= new THREE.MeshNormalMaterial();
	var meshCylinder= new THREE.Mesh( geometry, material );
	cannonMesh.add(meshCylinder)
	meshCylinder.lookAt(new THREE.Vector3(0,5,-1))
	meshCylinder.position.set(0,0.05, 0.3)

	//////////////////////////////////////////////////////////////////////////////////
	//		controls							//
	//////////////////////////////////////////////////////////////////////////////////
			
	this.gunSpeed	= 0
	onRenderFcts.push(function(delta, now){
		var angle	= this.gunSpeed * delta
		cannonMesh.rotateY(angle)
	}.bind(this))
	
	this.turnSpeed	= 0
	onRenderFcts.push(function(delta, now){
		var angle	= this.turnSpeed * delta
		baseMesh.rotateY(angle)
	}.bind(this))

	this.moveSpeed	= 0
	onRenderFcts.push(function(delta, now){
		var velocity	= new THREE.Vector3(0, 0, this.moveSpeed);
		var matrix	= new THREE.Matrix4().makeRotationY(baseMesh.rotation.y);
		velocity.applyMatrix4( matrix );
		baseMesh.position.add(velocity);
	}.bind(this))
}
