var THREEx	= THREEx	|| {}
/**
 * smoothly keep controlled object3d at the holder looking at the target object3d
 * @param  {THREE.Object3D} controlled the object being controlled
 * @param  {THREE.Object3D} holder  the object being the theorical position of the controlled object
 * @param  {THREE.Object3D} target  the object being the direction to lookAt for the controlled object
 */
THREEx.SmoothHolderControls	= function(controlled, holder, target){
	this.holderDamping	= 0.1
	this.targetDamping	= 0.1
	var holderPos	= null
	var targetPos	= null
	var _vector3	= new THREE.Vector3()
	this.update	= function(delta, now){
		// compute world position for holder
		holder.updateMatrixWorld();
		_vector3.getPositionFromMatrix( holder.matrixWorld )
		holderPos	= holderPos || _vector3.clone()
		holderPos.lerp(_vector3, this.holderDamping)
		// compute world position for target
		target.updateMatrixWorld();
		_vector3.getPositionFromMatrix( target.matrixWorld )
		targetPos	= targetPos || _vector3.clone()
		targetPos.lerp(_vector3, this.targetDamping)
		// position controlled at holderPos looking at targetPos
		controlled.position.copy(holderPos)	
		controlled.lookAt(targetPos)			
	}
}
