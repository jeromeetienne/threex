var THREEx	= THREEx	|| {}


THREEx.OutlineHelper	= function(object3d, renderer, camera, thickness){
	thickness	= thickness !== undefined ? thickness : 8

	// TODO handle dilatation

	// compute the object height
	var boundingBox	= new THREE.Box3().setFromObject(object3d)
	var objectHeight= boundingBox.size().y

	// build the outline mesh
	var material	= new THREE.MeshBasicMaterial({
		color	: new THREE.Color(0x0088cc),
		side	: THREE.BackSide,
	})
	THREE.Mesh.call( this, object3d.geometry, material)

	// update function
	this.update	= function(){
		// update worldMatrix
		object3d.updateMatrixWorld();

		// decompose object3d.matrixWorld
		var position	= new THREE.Vector3()
		var scale	= new THREE.Vector3()
		var quaternion	= new THREE.Quaternion()
		object3d.matrixWorld.decompose(position, quaternion, scale)

		// from https://developer.valvesoftware.com/wiki/Field_of_View#FOV_calculations
		var objectDistance	= position.distanceTo(camera.position)
		var verticalFov		= camera.fov / 180 * Math.PI
		var viewPlaneHeight	= objectDistance * (2*Math.tan(verticalFov/2))

		var screenHeight	= renderer.domElement.height
		var objectScreenHeight	= screenHeight/viewPlaneHeight * objectHeight

		// compute the scale 
 		var scaleRatio	= 0.0025 * (250/objectScreenHeight)
 		var scaleFactor	= 1 + scaleRatio*thickness
 		scale.multiplyScalar(scaleFactor)

 		// now compose the helper matrixWorld
		this.matrixWorld.compose(position, quaternion, scale)
		this.matrixAutoUpdate = false;
	}
}


THREEx.OutlineHelper.prototype = Object.create( THREE.Mesh.prototype );
