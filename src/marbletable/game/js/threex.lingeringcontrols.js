var THREEx	= THREEx	|| {}

THREEx.LingeringControls	= function(controlled, centerObject, radius){
	var centerPos		= new THREE.Vector3()
	var controlledPos	= new THREE.Vector3()
	var deltaPosition	= new THREE.Vector3()
	this.update	= function(delta, now){
		controlled.updateMatrixWorld();
		controlledPos.getPositionFromMatrix( controlled.matrixWorld )
		
		centerObject.updateMatrixWorld();
		centerPos.getPositionFromMatrix( centerObject.matrixWorld )
		
		deltaPosition.subVectors(controlledPos, centerPos)
		var angle	= Math.atan2(deltaPosition.z, deltaPosition.x)		
		
		controlled.position.x	= centerPos.x + Math.cos(angle)*radius
		controlled.position.z	= centerPos.z + Math.sin(angle)*radius
	}
}
