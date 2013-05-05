var THREEx	= THREEx || {};

THREEx.Glow	= function(renderer, camera){
	// setup the RenderTarget
	var textureW	= window.innerWidth/4
	var textureH	= window.innerHeight/4
	this.renderTarget = new THREE.WebGLRenderTarget(textureW, textureH, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.NearestFilter,
		format		: THREE.RGBFormat
	})
	
	this.scene	= new THREE.Scene;

	var blurHLevel	= 6
	var blurVLevel	= 3
	this.composer	= new THREEx.EffectComposer(renderer, this.renderTarget)
		.renderPass(this.scene, camera)
		.horizontalBlur(blurHLevel).verticalBlur(blurVLevel)
		.horizontalBlur(blurHLevel)
		.horizontalBlur(blurHLevel)
		.finish()
}

THREEx.Glow.prototype.update = function(delta, now) {
	this.composer.update(delta)
};

/**
 * copy the scene 
 * @param  {THREE.Scene} srcScene   the scene to copy
 * @param  {Function} materialCb callback called to determined material of THREE.Mesh's
 * @return {THREE.Scene}            the just-built scene
 */
THREEx.Glow.prototype.copyScene = function(srcScene, materialCb){
	
	return copyNode(srcScene, materialCb, this.scene)

	function copyNode(srcObject, materialCb, dstObject){
		// handle srcObject per type
		if( dstObject !== undefined ){
			// just keep it
		}else if( srcObject instanceof THREE.Scene ){
			dstObject	= new THREE.Scene()
		}else if( srcObject instanceof THREE.Mesh ){
			var geometry	= srcObject.geometry.clone()
			var material	= materialCb(srcObject)
			dstObject	= new THREE.Mesh( geometry, material )
		}else if( srcObject instanceof THREE.Object3D ){
			dstObject	= new THREE.Object3D()
		}else	console.assert(false)
		// clone position/rotation/scale
		dstObject.position	= srcObject.position
		dstObject.rotation	= srcObject.rotation
		dstObject.scale		= srcObject.scale
		// clone children
		for(var i = 0; i < srcObject.children.length; i ++ ) {
			var srcChild	= srcObject.children[ i ];
			var dstChild	= copyNode( srcChild, materialCb )
			dstObject.add( dstChild );
		}
		// return the object we just built
		return dstObject
	}
}