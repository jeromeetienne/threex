var THREEx	= THREEx	|| {};

THREEx.ColorAdjust	= {}

THREEx.ColorAdjust.baseURL	= '../'

THREEx.ColorAdjust.colorCubes	= {
	'default'		: 'images/default.png',
	'monochrome'		: 'images/monochrome.png',
	'sepia'			: 'images/sepia.png',
	'saturated'		: 'images/saturated.png',
	'posterize'		: 'images/posterize.png',
	'inverse'		: 'images/inverse.png',
	'color-negative'	: 'images/color-negative.png',
	'high-contrast-bw'	: 'images/high-contrast-bw.png',
	'funky-contrast'	: 'images/funky-contrast.png',
	'nightvision'		: 'images/nightvision.png',
	'thermal'		: 'images/thermal.png',
	'black-white'		: 'images/black-white.png',
	'hue-plus-60'		: 'images/hue-plus-60.png',
	'hue-plus-180'		: 'images/hue-plus-180.png',
	'hue-minus-60'		: 'images/hue-minus-60.png',
	'red-to-cyan'		: 'images/red-to-cyan.png',
	'blues'			: 'images/blues.png',
	'infrared'		: 'images/infrared.png',
	'radioactive'		: 'images/radioactive.png',
	'goolgey'		: 'images/googley.png',
	'bgy'			: 'images/bgy.png',
}


THREEx.ColorAdjust.Renderer	= function(renderer, scene, camera){
	// create the composer
	var composer	= new THREE.EffectComposer( renderer )
	this.composer	= composer

	var effect	= new THREE.RenderPass( scene, camera )
	composer.addPass( effect )

	var effect	= new THREE.ShaderPass( THREEx.ColorAdjust.Shader )
	this.colorAdjustPass	= effect;
	composer.addPass( effect )
	
	// mark the last pass as ```renderToScreen```
	composer.passes[composer.passes.length-1].renderToScreen	= true;

	// set default configuration
	effect.uniforms['mixAmount'].value	= 0
	effect.uniforms['tColorCube0'].value	= buildTexture(THREEx.ColorAdjust.baseURL + THREEx.ColorAdjust.colorCubes['default'], 8)
	effect.uniforms['tColorCube1'].value	= effect.uniforms['tColorCube0'].value

	this.delay	= 0.5
	
	this.update	= function(delta, now){
		if( effect.uniforms['mixAmount'].value > 0 ){
			effect.uniforms['mixAmount'].value	-= delta/this.delay;
			effect.uniforms['mixAmount'].value	= Math.max(effect.uniforms['mixAmount'].value, 0) 
		}
		
		composer.render(delta);		
	}.bind(this)

	this.setColorCube	= function(value){
		effect.uniforms['tColorCube1'].value	= effect.uniforms['tColorCube0'].value
		var url		= THREEx.ColorAdjust.baseURL + THREEx.ColorAdjust.colorCubes[value]
		effect.uniforms['tColorCube0'].value	= buildTexture(url, 8)
		effect.uniforms['mixAmount'].value	= 1
	}
	
	function buildTexture(url, width, callback) {
		// create the canvas
		var canvas	= document.createElement("canvas");
		canvas.width	= width * width;
		canvas.height	= width;
		// load the image
		var image	= document.createElement('img');
		image.addEventListener('load', function (event){
			var ctx		= canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);
			texture.needsUpdate	= true
			callback	&& callback(texture)
		})
		image.src	= url
		// create the texture
		var texture	= new THREE.Texture(canvas);
		// important to get the proper filters
		texture.minFilter	= THREE.LinearFilter;
		texture.magFilter	= THREE.LinearFilter;
		// return the just built texture
		return texture;
	}
}


/**
 * ColorAdjustShader - from http://webglsamples.googlecode.com/hg/color-adjust/color-adjust.html 
 * by Greggman
 */
THREEx.ColorAdjust.Shader	= {
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

		'vec4 sampleAs3DTexture(sampler2D texture, vec3 uv, float width) {',
		'	float sliceSize		= 1.0 / width;				// space of 1 slice',
		'	float slicePixelSize	= sliceSize / width;			// space of 1 pixel',
		'	float sliceInnerSize	= slicePixelSize * (width - 1.0);	// space of width pixels',
		'	float zSlice0	= min(floor(uv.z * width), width - 1.0);',
		'	float zSlice1	= min(zSlice0 + 1.0, width - 1.0);',
		'	float xOffset	= slicePixelSize * 0.5 + uv.x * sliceInnerSize;',
		'	float s0	= xOffset + (zSlice0 * sliceSize);',
		'	float s1	= xOffset + (zSlice1 * sliceSize);',
		'	vec4 slice0Color= texture2D(texture, vec2(s0, uv.y));',
		'	vec4 slice1Color= texture2D(texture, vec2(s1, uv.y));',
		'	float zOffset	= mod(uv.z * width, 1.0);',
		'	vec4 result	= mix(slice0Color, slice1Color, zOffset);',
		'	return result;',
		'}',

		'void main() {',
		'	vec4 srcColor	= texture2D(tDiffuse, vUv);',
		'	srcColor.g	= 1.0 - srcColor.g;',

		'	vec4 color0	= sampleAs3DTexture(tColorCube0, srcColor.rgb, 8.0);',
		'	vec4 color1	= sampleAs3DTexture(tColorCube1, srcColor.rgb, 8.0);',

		'	gl_FragColor	= vec4(mix(color0, color1, mixAmount).rgb, srcColor.a);',
		'}',
	].join('\n'),
}
