var THREEx	= THREEx	|| {};


THREEx.ColorAdjustRenderer	= function(renderer, scene, camera){
	// create the composer
	var composer	= new THREE.EffectComposer( renderer )
	this.composer	= composer

	var effect	= new THREE.RenderPass( scene, camera )
	composer.addPass( effect )

	var effect	= new THREE.ShaderPass( THREEx.ColorAdjustShader )
	this.colorAdjustPass	= effect;
	composer.addPass( effect )

	// mark the last pass as ```renderToScreen```
	composer.passes[composer.passes.length-1].renderToScreen	= true;

	this.update	= function(delta, now){
		composer.render(delta);		
	}
}

/**
 * ColorAdjustShader - from http://webglsamples.googlecode.com/hg/color-adjust/color-adjust.html 
 * by Greggman
 */
THREEx.ColorAdjustShader	= {
	uniforms	: {
		'mixAmount'	: { type: 'f', value: 0.5 },
		'tDiffuse'	: { type: 't', value: null },
		'tColorCube0'	: { type: 't', value: null },
		'tColorCube1'	: { type: 't', value: null },
	},
	vertexShader	: [
		'varying vec2	vUv;',

		'void main() {',
			'vUv		= uv;',
			'gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}'	
	].join('\n'),
	fragmentShader	: [
		'varying vec2		vUv;',

		'uniform float		mixAmount;',
		'uniform sampler2D	tDiffuse;',
		'uniform sampler2D	tColorCube0;',
		'uniform sampler2D	tColorCube1;',

		'vec4 sampleAs3DTexture(sampler2D tex, vec3 uv, float width) {',
		'	float sliceSize	= 1.0 / width;		// space of 1 slice',
		'	float slicePixelSize	= sliceSize / width;	// space of 1 pixel',
		'	float sliceInnerSize	= slicePixelSize * (width - 1.0);	// space of width pixels',
		'	float zSlice0	= min(floor(uv.z * width), width - 1.0);',
		'	float zSlice1	= min(zSlice0 + 1.0, width - 1.0);',
		'	float xOffset	= slicePixelSize * 0.5 + uv.x * sliceInnerSize;',
		'	float s0	= xOffset + (zSlice0 * sliceSize);',
		'	float s1	= xOffset + (zSlice1 * sliceSize);',
		'	vec4 slice0Color= texture2D(tex, vec2(s0, uv.y));',
		'	vec4 slice1Color= texture2D(tex, vec2(s1, uv.y));',
		'	float zOffset	= mod(uv.z * width, 1.0);',
		'	vec4 result	= mix(slice0Color, slice1Color, zOffset);',
		'	return result;',
		'}',

		'void main() {',
		'	vec4 srcColor	= texture2D(tDiffuse, vUv);',

		'	vec4 color0	= sampleAs3DTexture(tColorCube0, srcColor.rgb, 8.0);',
		'	vec4 color1	= sampleAs3DTexture(tColorCube1, srcColor.rgb, 8.0);',

		'	gl_FragColor	= vec4(mix(color0, color1, mixAmount).rgb, srcColor.a);',
		// '	gl_FragColor	= vec4(mix(srcColor.rgb, srcColor.rgb, mixAmount).rgb, srcColor.a);',
		// '	gl_FragColor	= srcColor;',
		'}',
	].join('\n'),
}
