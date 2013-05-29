var THREEx = THREEx || {}

/**
 * namespace for the extension
 * @type {Object}
 */
THREEx.Transparency	= {};

/**
 * init transparency of a object recursivly
 * @param  {THREE.Object3D} object the object3D to update
 */
THREEx.Transparency.init	= function(object){
	object.traverse(function(object){
		var material	= object.material
		if( !material )	return;
		if( material.transparent !== true )	return;
		material.depthWrite	= false
	});	
}

/**
 * update the object for transparency rendering
 * @param  {THREE.Object3D} object the object3D to update
 * @param  {THREE.Camera} camera the camera used for rendering
 */
THREEx.Transparency.update	= function(object, camera){
	// update camera matrices
	camera.updateMatrixWorld()
	camera.matrixWorldInverse.getInverse( camera.matrixWorld )

	var screenMatrix= new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
	var position	= new THREE.Vector3()
	
	// update the matrixWorld of the object and its children
	object.updateMatrixWorld()
	// traverse the object
	object.traverse(function(childObject){
		// ignore object which doesnt have material
		if( childObject.material === undefined )		return
		// ignore object which arent transparent
		if( childObject.material.transparent === false )	return;
		
		// compute its position in screen space 
		position.getPositionFromMatrix( childObject.matrixWorld );
		position.applyProjection( screenMatrix );
		// use the position.x as renderDepth
		childObject.renderDepth	= position.z;
	})
}


