var THREEx	= THREEx	|| {}

/**
 * [ description]
 * @param  {String} label    the label of the sceneMirror
 * @param  {THREE.Scene} srcScene the scene to mirror
 * @return {THREE.SceneCloner}          [description]
 */
THREEx.SceneCloner	= function(label, srcScene, onAdded, onRemoved){
	label	= 'sceneCloner-'+label

//	onAdded	= onAdded	|| function(dstObject, srcObject, event){}

	var dstScene	= new THREE.Scene()
	this.dstScene	= dstScene

	srcScene.userData[label]	= dstScene
	
	this._addedDefaultCallback	= function(event){
		var srcObject	= event.target

		var geometry	= srcObject.geometry.clone()
		var material	= srcObject.material.clone()
		var dstObject	= new THREE.Mesh(geometry, material)

		srcObject.clone(dstObject)
		dstObject.position	= srcObject.position
		dstObject.quaternion	= srcObject.quaternion
		dstObject.scale		= srcObject.scale
		
		console.assert(srcObject.parent)
		console.assert(srcObject.parent.userData[label])
		var dstParent	= srcObject.parent.userData[label]
		dstParent.add(dstObject)

		console.assert(srcObject.userData[label] === undefined)
		srcObject.userData[label]	= dstObject

		onAdded(dstObject, srcObject, event)
	}
	
	this.add	= function(srcObject3d){
		srcObject3d.addEventListener('added', this._addedDefaultCallback)	
	}
}