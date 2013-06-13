var THREEx	= THREEx	|| {}
/**
 * smoothly keep controlled object3d at the source looking at the target object3d
 * @param  {THREE.Object3D} controlled the object being controlled
 * @param  {THREE.Object3D} source  the object being the theorical position of the controlled object
 * @param  {THREE.Object3D} target  the object being the direction to lookAt for the controlled object
 */
THREEx.SmoothControls	= function(controlled, source, target){
	this.sourceDamping	= 0.1
	this.targetDamping	= 0.1
	var sourcePos	= null
	var targetPos	= null
	var _vector3	= new THREE.Vector3()
	this.update	= function(delta, now){
		// compute world position for source
		source.updateMatrixWorld();
		_vector3.getPositionFromMatrix( source.matrixWorld )
		sourcePos	= sourcePos || _vector3.clone()
		sourcePos.lerp(_vector3, this.sourceDamping)
		// compute world position for target
		target.updateMatrixWorld();
		_vector3.getPositionFromMatrix( target.matrixWorld )
		targetPos	= targetPos || _vector3.clone()
		targetPos.lerp(_vector3, this.targetDamping)
		// position controlled at sourcePos looking at targetPos
		controlled.position.copy(sourcePos)	
		controlled.lookAt(targetPos)			
	}
}
