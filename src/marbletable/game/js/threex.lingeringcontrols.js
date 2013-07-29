var THREEx	= THREEx	|| {}

THREEx.LingeringControls	= function(object3d, target, radius){
	var targetPosition	= target.position.clone()
	var object3dPosition	= object3d.position.clone()
	var deltaPosition	= new THREE.Vector3()
	this.update	= function(delta, now){
		// get world position of object3d
		object3d.updateMatrixWorld();
		object3dPosition.getPositionFromMatrix( object3d.matrixWorld )
		// get world position of target	
		var tmp	= targetPosition.clone()
		target.updateMatrixWorld();
		targetPosition.getPositionFromMatrix( target.matrixWorld )
		var targetVelocity	= tmp.sub(targetPosition).negate().length();

		// object3d.position.y = f(targetVelocity)
		// object3d.position.y	= 2 - targetVelocity*10

// object3d.up = f(object.up, rotationYDelta)

		// get angle between object3d and target
		deltaPosition.subVectors(object3dPosition, targetPosition)
		// TODO maybe here to multiply by scalar ?
		var angle	= Math.atan2(deltaPosition.z, deltaPosition.x)
		// force distance between object3d and target to be radius
		object3d.position.x	= targetPosition.x + Math.cos(angle)*radius
		object3d.position.z	= targetPosition.z + Math.sin(angle)*radius

		// set object3d direction
		object3d.lookAt(targetPosition)

		// set a fixed up angle
		object3d.up.set(0, 1, 0)
		object3d.up.applyMatrix4( new THREE.Matrix4().makeRotationZ(-Math.PI/8) )

		var deltaPos	= target.position.clone().sub(object3d.position)
		var angle	= - Math.PI/2 - Math.atan2(deltaPos.z, deltaPos.x)
		object3d.up.applyMatrix4( new THREE.Matrix4().makeRotationY(angle) )
	}
}
