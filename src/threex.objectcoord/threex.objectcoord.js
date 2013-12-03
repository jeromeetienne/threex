var THREEx	= THREEx	|| {}

THREEx.ObjCoord	= function(object3d){
	this.screenPosition	= function(camera){
		return THREEx.ObjCoord.screenPosition(object3d, camera)
	}
	this.worldPosition	= function(){
		return THREEx.ObjCoord.worldPosition(object3d)
	}
	this.cssPosition	= function(renderer, camera){
		return THREEx.ObjCoord.cssPosition(object3d, renderer, camera)
	}
	return this
}


/**
 * get the world position
 * @return {THREE.Vector3}	the world position
 */
THREEx.ObjCoord.worldPosition	= function(object3d){
	object3d.updateMatrixWorld();
	var worldMatrix	= object3d.matrixWorld;
	var worldPos	= new THREE.Vector3().getPositionFromMatrix(worldMatrix);
	return worldPos;
}

/**
 * get screen position
 * 
 * @param  {THREE.Object3D} object3d	the object3damera used to render
 * @param  {THREE.Camera} camera	the camera used to render
 * @return {THREE.Vector3}			the screen position
 */
THREEx.ObjCoord.screenPosition	= function(object3d, camera){
	var position	= this.worldPosition(object3d)
	return this.convertWorldToScreenSpace(position, camera)
}


/**
 * get css position
 * 
 * @param  {THREE.Object3D} object3d	the object3damera used to render
 * @param  {THREE.Renderer} renderer	the renderer used to render
 * @param  {THREE.Camera} camera	the camera used to render
 * @return {THREE.Vector3}		the screen position
 */
THREEx.ObjCoord.cssPosition	= function(object3d, camera, renderer){
	var position	= this.screenPosition(object3d, camera);
	position.x	= (  (position.x/2 + 0.5)) * renderer.domElement.width;
	position.y	= (1-(position.y/2 + 0.5)) * renderer.domElement.height;
	return position;
}



/**
 * convert world position to screen space
 * 
 * @param  {THREE.Vector3}	worldPosition	the world position
 * @param  {THREE.Camera}	tCamera       	the camera used to render
 * @return {THREE.Vector3}			the screen space position [-1, +1]
 */
THREEx.ObjCoord.convertWorldToScreenSpace	= function(worldPosition, camera){
	var projector	= this.projector || new THREE.Projector();
	this.projector	= projector
	var screenPos	= projector.projectVector(worldPosition.clone(), camera );
	return screenPos;
}
