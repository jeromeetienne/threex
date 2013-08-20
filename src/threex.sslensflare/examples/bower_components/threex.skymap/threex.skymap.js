/** @namespace */
var THREEx	= THREEx || {}

THREEx.createSkymap	= function(opts){
	opts		= opts			|| {}
	if(typeof(opts) === 'string')	opts	= {textureCube: THREEx.createTextureCube(opts)}
	// handle default arguments
	var textureCube	= opts.textureCube	|| console.assert(false, 'opts.textureCube MUST be provided')
	var cubeW	= opts.cubeW		|| 500
	var cubeH	= opts.cubeH		|| 500
	var cubeD	= opts.cubeD		|| 500
	// init material
	var shader	= THREE.ShaderLib['cube']
	var uniforms	= THREE.UniformsUtils.clone(shader.uniforms)
	uniforms[ "tCube" ].value	= textureCube;
	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: uniforms,
		depthWrite	: false,
		side		: THREE.BackSide
	})
	// init geometry 
	var geometry	= new THREE.CubeGeometry(cubeW, cubeH, cubeD)
	// init mesh
	var mesh	= new THREE.Mesh(geometry, material);
	// return just built mesh
	return mesh
}
