var THREEx	= THREEx || {};

THREEx.GodRays	= function(renderer, camera, renderTarget){
	// setup the RenderTarget
	if( renderTarget === undefined ){
		var textureW	= Math.floor(renderer.domElement.offsetWidth /4)
		var textureH	= Math.floor(renderer.domElement.offsetHeight/4)
		renderTarget	= new THREE.WebGLRenderTarget(textureW, textureH, {
			minFilter	: THREE.LinearFilter,
			magFilter	: THREE.LinearFilter,
			format		: THREE.RGBFormat
		})
	}
	this.renderTarget = renderTarget
	
	var scene	= new THREE.Scene
	this.scene	= scene

	// create the composer
	var composer	= new THREE.EffectComposer( renderer, renderTarget );
	this.composer	= composer

	// add Render Pass
	var effect	= new THREE.RenderPass(scene, camera);
	composer.addPass( effect )
	
	// configuration 
	var blurHLevel	= 0.003
	var blurVLevel	= 0.006

	console.assert( THREE.HorizontalBlurShader )
	console.assert( THREE.VerticalBlurShader )
	console.assert( THREEx.RadialBlurShader )

	// add HorizontalBlur Pass
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader )
	effect.uniforms[ 'h' ].value	= blurHLevel 
	composer.addPass( effect )
	// add VerticalBlur Pass
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader )
	effect.uniforms[ 'v' ].value	= blurVLevel
	composer.addPass( effect )

	// add RadialBlurShader Pass
	var effect	= new THREE.ShaderPass( THREEx.RadialBlurShader )
	composer.addPass( effect )
};


THREEx.GodRays.prototype.updateSunPosition = function(object3d){
	var projector	= new THREE.Projector()
	var rBlurPass	= this.composer.passes[3]
	
	// apply the force to the center of the mesh
	mesh.updateMatrixWorld()
	// get world position
	var sunScreenPos= new THREE.Vector3()
	sunScreenPos.getPositionFromMatrix(mesh.matrixWorld)
	projector.projectVector( sunScreenPos, camera );

	// translation in coordinate from [-1, 1] to [0, 1]
	sunScreenPos.x	= ( sunScreenPos.x + 1 ) / 2;
	sunScreenPos.y	= ( sunScreenPos.y + 1 ) / 2;

	// update shader 
	rBlurPass.uniforms['fSunScreenX'].value	= sunScreenPos.x;
	rBlurPass.uniforms['fSunScreenY'].value	= sunScreenPos.y;
}

THREEx.GodRays.prototype.update = function(delta, now) {
	this.composer.render(delta);
}

/**
 * copy the scene. This is a helper function. you can build you scene the way you want
 * 
 * @param  {THREE.Scene} srcScene   the scene to copy
 * @param  {Function} materialCb callback called to determined material of THREE.Mesh's
 * @return {THREE.Scene}            the just-built scene
 */
THREEx.GodRays.prototype.copyScene = function(srcScene, materialCb){
	
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
		dstObject.quaternion	= srcObject.quaternion
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
