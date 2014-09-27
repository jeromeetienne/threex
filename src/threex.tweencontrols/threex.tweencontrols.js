var THREEx	= THREEx	|| {}


THREEx.TweenControls	= function(object3d){

	var startTime		= null

	var startPosition	= new THREE.Vector3
	var finalPosition	= new THREE.Vector3
	var startQuaternion	= new THREE.Quaternion
	var finalQuaternion	= new THREE.Quaternion
	var startScale		= new THREE.Vector3
	var finalScale		= new THREE.Vector3


	this.tweenDelay		= 1
	// to set the tween function 
	// - for a full list, see tween.js TWEEN.Easing in https://github.com/sole/tween.js/blob/master/src/Tween.js
	this.tweenFunction	= function(progress){
		return progress
	}

	this.setTarget	= function(newPosition, newQuaternion, newScale){
		// handle default arguments
		newPosition	= newPosition	|| object3d.position
		newQuaternion	= newQuaternion	|| object3d.quaternion
		newScale	= newScale	|| object3d.scale
		// set startTime
		startTime	= Date.now()/1000

		// set position
		startPosition.copy(object3d.position)
		finalPosition.copy(newPosition)
		// set quaternion
		startQuaternion.copy(object3d.quaternion)
		finalQuaternion.copy(newQuaternion)
		// set scale
		startScale.copy(object3d.scale)
		finalScale.copy(newScale)
	}
	this.isRunning	= function(){
		return startTime !== null ? true : false
	}
	this.update	= function(){
		// return now if no tweening is in progress
		if( startTime === null )	return

		var now		= Date.now()/1000
		// if tweening just completed, set it to final position
		if( now - startTime > this.tweenDelay ){
			object3d.position.copy(finalPosition)
			startTime	= null
			return
		}
		// compute and tween progress 
		var progress	= (now - startTime) / this.tweenDelay
		progress	= this.tweenFunction(progress)

		// Position - compute and set current delta position based on progress
		var distance	= finalPosition.distanceTo(startPosition) * progress
		var delta	= finalPosition.clone().sub(startPosition)
		delta.setLength(distance)
		object3d.position.copy(startPosition).add(delta)

		// Quaternion - compute and set current delta position based on progress
		object3d.quaternion.copy(startQuaternion).slerp(finalQuaternion, progress)

		// Scale - compute and set current delta position based on progress
		var distance	= finalScale.distanceTo(startScale) * progress
		var delta	= finalScale.clone().sub(startScale)
		delta.setLength(distance)
		object3d.scale.copy(startScale).add(delta)
	}
}