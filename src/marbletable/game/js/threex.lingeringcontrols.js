var THREEx	= THREEx	|| {}

THREEx.LingeringControls	= function(object3d, target, radius){
	var targetPosition	= new THREE.Vector3()
	var object3dPosition	= new THREE.Vector3()
	var deltaPosition	= new THREE.Vector3()
	var previousAngle	= null
	this.update	= function(delta, now){
		// get world position of object3d
		object3d.updateMatrixWorld();
		object3dPosition.getPositionFromMatrix( object3d.matrixWorld )
		// get world position of target		
		target.updateMatrixWorld();
		targetPosition.getPositionFromMatrix( target.matrixWorld )
		// get angle between object3d and target
		deltaPosition.subVectors(object3dPosition, targetPosition)
		var angle	= Math.atan2(deltaPosition.z, deltaPosition.x)
		// force distance between object3d and target to be radius
		object3d.position.x	= targetPosition.x + Math.cos(angle)*radius
		object3d.position.z	= targetPosition.z + Math.sin(angle)*radius
		// set object3d direction
		object3d.lookAt(targetPosition)
	}
}
