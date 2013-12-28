var THREEx	= THREEx	|| {}

THREEx.SolidWireframeMaterial	= function(geometry){

	// wireframe using gl.TRIANGLES (interpreted as quads)

	var attributes	= {
		center: {
			type	: 'v4',
			boundTo	: 'faceVertices',
			value	: []
		}
	};
	var values	= attributes.center.value;

	setupAttributes( geometry, values );

	var material	= new THREE.ShaderMaterial({
		uniforms	: {},
		attributes	: attributes,
		vertexShader	: THREEx.SolidWireframeMaterial.vertexShader,
		fragmentShader	: THREEx.SolidWireframeMaterial.fragmentShader,
	});
	
	return material;

	function setupAttributes( geometry, values ) {
		for( var f = 0; f < geometry.faces.length; f ++ ) {
			var face = geometry.faces[ f ];
			if ( face instanceof THREE.Face3 ) {
				values[ f ] = [ new THREE.Vector4( 1, 0, 0, 0 ), new THREE.Vector4( 0, 1, 0, 0 ), new THREE.Vector4( 0, 0, 1, 0 ) ];
			} else {
				values[ f ] = [ new THREE.Vector4( 1, 0, 0, 1 ), new THREE.Vector4( 1, 1, 0, 1 ), new THREE.Vector4( 0, 1, 0, 1 ), new THREE.Vector4( 0, 0, 0, 1 ) ];
			}
		}
	}
}

/**
 * the vertex shader
 * @type {String}
 */
THREEx.SolidWireframeMaterial.vertexShader	= [
	"attribute vec4 center;",
	"varying vec4 vCenter;",

	"void main() {",
		"vCenter = center;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	"}",
].join('\n')

/**
 * the fragment shader
 * @type {String}
 */
THREEx.SolidWireframeMaterial.fragmentShader	= [
	"#extension GL_OES_standard_derivatives : enable",

	"varying vec4 vCenter;",

	"float edgeFactorTri() {",
		"vec3 d = fwidth( vCenter.xyz );",
		"vec3 a3 = smoothstep( vec3( 0.0 ), d * 1.5, vCenter.xyz );",
		"return min( min( a3.x, a3.y ), a3.z );",
	"}",

	"float edgeFactorQuad1() {",
		"vec2 d = fwidth( vCenter.xy );",
		"vec2 a2 = smoothstep( vec2( 0.0 ), d * 1.5, vCenter.xy );",
		"return min( a2.x, a2.y );",
	"}",

	"float edgeFactorQuad2() {",
		"vec2 d = fwidth( 1.0 - vCenter.xy );",
		"vec2 a2 = smoothstep( vec2( 0.0 ), d * 1.5, 1.0 - vCenter.xy );",
		"return min( a2.x, a2.y );",
	"}",

	"void main() {",
		"if ( vCenter.w == 0.0 ) {",
			"gl_FragColor.rgb = mix( vec3( 1.0 ), vec3( 0.2 ), edgeFactorTri() );",
		"} else {",
			"gl_FragColor.rgb = mix( vec3( 1.0 ), vec3( 0.2 ), min( edgeFactorQuad1(), edgeFactorQuad2() ) );",

		"}",
		"gl_FragColor.a = 1.0;",
	"}",
].join('\n')

