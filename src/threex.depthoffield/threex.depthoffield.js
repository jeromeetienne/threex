/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

/**
 * setup a depth of field rendering
 * 
 * @todo handle resizing
 * @param {THREE.WebGLRenderer} renderer the renderer to use
 */
THREEx.DepthOfField	= function(renderer){
	var rendererW	= renderer.domElement.offsetWidth
	var rendererH	= renderer.domElement.offsetHeight
	// init scene
	var scene	= new THREE.Scene()
	// init camera
	var camera	= new THREE.OrthographicCamera(
		  -rendererW/2,  rendererW/2
		,  rendererH/2, -rendererH/2
		, -10000, 10000);
	camera.position.z = 100;
	scene.add( camera );

	// init render target
	var renderTargetDepth	= new THREE.WebGLRenderTarget(rendererW, rendererH, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.LinearFilter,
		format		: THREE.RGBFormat
	})
	var renderTargetColor	= new THREE.WebGLRenderTarget(rendererW, rendererH, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.LinearFilter,
		format		: THREE.RGBFormat
	})

	// init uniforms
	var uniforms	= THREE.UniformsUtils.clone( THREE.BokehShader.uniforms );
	uniforms['tColor'].value	= renderTargetColor;
	uniforms['tDepth'].value	= renderTargetDepth;
	uniforms['aspect'].value	= rendererW / rendererH;
	uniforms['focus'].value		= 0.80

	// exagerated setting 
	uniforms['aperture'].value	= 0.03
	uniforms['maxblur'].value	= 0.015

	// realist setting - thanks @lmg
	// uniforms['aperture'].value	= 0.006
	// uniforms['maxblur'].value	= 0.004

	// init mesh
	var material	= new THREE.ShaderMaterial({
		uniforms	: uniforms,
		vertexShader	: THREE.BokehShader.vertexShader,
		fragmentShader	: THREE.BokehShader.fragmentShader
	})
	var geometry	= new THREE.PlaneGeometry( rendererW, rendererH )
	var mesh	= new THREE.Mesh( geometry, material )
	mesh.position.z = -500
	scene.add( mesh )
	
	// export values
	this.scene	= scene
	this.camera	= camera
	this.uniforms	= uniforms
	this.renderer	= renderer
	this.renderTargetDepth	= renderTargetDepth;		
	this.renderTargetColor	= renderTargetColor;
}

/**
 * render the scene with a depthOfField
 * @param  {THREE.Scene} scene  the scene to render
 * @param  {THREE.Camera} camera the camera to use
 */
THREEx.DepthOfField.prototype.render = function(scene, camera){
	var renderer	= this.renderer
	renderer.autoClear = false;
	renderer.clear();
	// Render scene into texture
	scene.overrideMaterial = null;
	renderer.render( scene, camera, this.renderTargetColor, true );
	// Render depth into texture
	scene.overrideMaterial = new THREE.MeshDepthMaterial()
	renderer.render( scene, camera, this.renderTargetDepth, true );
	// Render bokeh composite
	renderer.render( this.scene, this.camera );
}

