var THREEx = THREEx || {}

/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
 * @return {[type]} [description]
 */
THREEx.createAtmosphereMaterial	= function(){
	var vertexShader	= [
		'uniform vec3  viewVector;',
		'uniform float coeficient;',
		'uniform float power;',
		'varying float intensity;',
		'void main() ',
		'{',
		'	// compute intensity',
		'	vec3 vNormal	= normalize( normalMatrix * normal );',
		'	vec3 vNormel	= normalize( normalMatrix * viewVector );',
		'	intensity	= pow( coeficient - dot(vNormal, vNormel), power );',
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}',
	].join('\n')
	var fragmentShader	= [
		'uniform vec3 glowColor;',
		'varying float intensity;',
		'void main() ',
		'{',
		'	vec3 glow	= glowColor * intensity;',
		'	gl_FragColor	= vec4( glow, 1.0 );',
		'}',
	].join('\n')


	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var material	= new THREE.ShaderMaterial({
		uniforms: { 	
			coeficient	: {
				type	: "f", 
				value	: 1.0
			},
			power		: {
				type	: "f",
				value	: 2
			},
			glowColor	: {
				type	: "c",
				value	: new THREE.Color('blue')
			},
			viewVector	: {
				type	: "v3",
				value	: camera.position
			}
		},
		vertexShader	: vertexShader,
		fragmentShader	: fragmentShader,
		side		: THREE.FrontSide,
		blending	: THREE.AdditiveBlending,
		transparent	: true
	});
	return material
}