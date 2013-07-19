var THREEx	= THREEx	|| {}

/**
 * [ description]
 * @param  {String} labelSuffix    the label of the sceneMirror
 * @param  {THREE.Scene} srcScene the scene to mirror
 * @return {THREE.SceneMirror}          [description]
 */
THREEx.SceneMirror	= function(srcScene, opts){
	opts		= opts	|| {}
	var labelSuffix	= opts.labelSuffix	|| Math.floor(Math.random()*0x10000).toString(16)
	var onAdded	= opts.onAdded		|| function(dstObject, srcObject, event){}
	var dstScene	= opts.dstScene		|| new THREE.Scene()
	this.dstScene	= dstScene

	var label	= 'sceneMirror-'+labelSuffix

	// TODO refactor this API
	// - with a opts i guess

	dstScene	= dstScene	|| new THREE.Scene()
	this.dstScene	= dstScene

	srcScene.userData[label]	= dstScene
	
	var addedCallback	= function(event){
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
		srcObject3d.addEventListener('added', addedCallback)	
	}
}