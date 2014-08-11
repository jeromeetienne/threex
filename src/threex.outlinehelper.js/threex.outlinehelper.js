var THREEx	= THREEx	|| {}


THREEx.OutlineHelper	= function(object3d, renderer, camera, thickness){
	thickness	= thickness !== undefined ? thickness : 8
	// compute the object height
	var boundingBox	= new THREE.Box3().setFromObject(object3d)
	var objectHeight= boundingBox.size().y

	// build the outline mesh
	var material	= new THREE.MeshBasicMaterial({
		color	: new THREE.Color(0x0088cc),
		side	: THREE.BackSide,
	})
	var outline	= new THREE.Mesh(object3d.geometry, material)
	this.object3d	= outline
	// add it to the object3d
	object3d.add(outline)
/**
 * * it should not be attached to object3d but to world
 * * this is a helper
 * * recompute the world position and copy them
 */
	// update function
	this.update	= function(){
		// from https://developer.valvesoftware.com/wiki/Field_of_View#FOV_calculations
		var objectDistance	= object3d.position.distanceTo(camera.position)
		var screenHeight	= renderer.domElement.height
		var yFovInRadians	= camera.fov / 180 * Math.PI
		var objectScreenHeight	= screenHeight * objectHeight/(objectDistance * (2*Math.tan(yFovInRadians/2)))
		// console.log(objectScreenHeight)
/**
 * if height === 250, scale = 1.01
 * if height === 25, scale = 1.1
 */

 		// compute the scale 
 		var scaleFactor	= 0.0025 * (250/objectScreenHeight)
 		var scale	= 1 + scaleFactor*thickness
 		outline.scale.set(1,1,1).multiplyScalar(scale)		
	}
}
