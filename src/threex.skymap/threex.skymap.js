/** @namespace */
var THREEx	= THREEx || {}

THREEx.createSkymap	= function(opts){
	opts		= opts			|| {}
	if(typeof(opts) === 'string')	opts	= {textureCube: THREEx.createTextureCube(opts)}
	// handle default arguments
	var textureCube	= opts.textureCube	|| console.assert(false)
	var cubeW	= opts.cubeW		|| 100
	var cubeH	= opts.cubeH		|| 100
	var cubeD	= opts.cubeD		|| 100
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
