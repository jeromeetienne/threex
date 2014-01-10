var THREEx	= THREEx	|| {};

THREEx.ToxicPproc	= {}

THREEx.ToxicPproc.baseURL	= '../'

THREEx.ToxicPproc.colorCubes	= {
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

/**
 * how to change so it is usable in a existing post processing chain ?
 * - possibility: 
 *   - put only the effect in a class
 *   - put the renderer in another
 */

THREEx.ToxicPproc.Passes	= function(){

	var effect	= new THREE.ShaderPass( THREEx.ToxicPproc.Shader )
	this.colorPass	= effect;

	this.addPassesTo	= function(composer){
		composer.addPass( effect )	
	}

	// set default configuration
	effect.uniforms['mixAmount'].value	= 0
	effect.uniforms['cubeWidth'].value	= 8
	effect.uniforms['tColorCube0'].value	= buildTexture(THREEx.ToxicPproc.baseURL + THREEx.ToxicPproc.colorCubes['default'], 8)
	effect.uniforms['tColorCube1'].value	= effect.uniforms['tColorCube0'].value

	// set default delay in seconds
	this.delay	= 0.5
	
	/**
	 * render function
	 * 
	 * @param  {[Number} delta delta in seconds since the last render
	 * @param  {[Number} now   aboslute time in seconds
	 */
	this.update	= function(delta, now){
		// constantly decrease ```mixAmount``` to zero to ease transition
		effect.uniforms['mixAmount'].value	-= delta/this.delay;
		if( effect.uniforms['mixAmount'].value < 0 ){
			effect.uniforms['mixAmount'].value	= 0 
		}
	}.bind(this)

	/**
	 * Change ColorCube with a well-known color cube
	 * 
	 * @param {String} value wellknown color cube
	 */
	this.setColorCube	= function(value){
		var url		= THREEx.ToxicPproc.baseURL + THREEx.ToxicPproc.colorCubes[value]
		var cubeWidth	= 8
		var texture	= buildTexture(url, cubeWidth)
		this.setColorCubeTexture(texture, cubeWidth)
	}
	
	/**
	 * Change ColorCube with your own 8x8 color cube
	 * 
	 * @param {THREE.Texture} texture	the texture to set
	 * @param {Number} cubeWidth		the width of the color cube
	 */
	this.setColorCubeTexture= function(texture, cubeWidth){
		effect.uniforms['mixAmount'].value	= 1
		effect.uniforms['cubeWidth'].value	= cubeWidth
		effect.uniforms['tColorCube1'].value	= effect.uniforms['tColorCube0'].value
		effect.uniforms['tColorCube0'].value	= texture
	}

	/**
	 * build texture of actual size, typically 8x8. 
	 * - most textures are oversized for color readability 
	 * 
	 * @param  {String}   url      the url of the texture to load
	 * @param  {Number}   width    the width (and height+depth) of the texture. it is mandatory to 
	 *                             be square as it is a color cube
	 * @param  {Function} onLoad	callback called when the image is actually loaded 
	 * @return {THREE.Texture}     the just built texture
	 */
	function buildTexture(url, width, onLoad) {
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
			onLoad	&& onLoad(texture)
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
 * ToxicPprocShader by Greggman
 * - from http://webglsamples.googlecode.com/hg/color-adjust/color-adjust.html 
 * - light adjustment to work with three.js
 */
THREEx.ToxicPproc.Shader	= {
	uniforms	: {
		'tDiffuse'	: { type: 't', value: null },
		'mixAmount'	: { type: 'f', value: 0.5 },
		'cubeWidth'	: { type: 'f', value: 8.0 },
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

		'uniform sampler2D	tDiffuse;',	// diffuse texture likely from screen
		'uniform float		mixAmount;',	// amount of mix between colorCube0 and colorCube1
		'uniform float		cubeWidth;',	// the width of the color cube
		'uniform sampler2D	tColorCube0;',	// target colorCube
		'uniform sampler2D	tColorCube1;',	// source colorCube 

		// trick to get 3D textures with webgl
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
			// read the screen texture color
		'	vec4 srcColor	= texture2D(tDiffuse, vUv);',
			// inverse texture coordinate y to fit three.js system
		'	srcColor.y	= 1.0 - srcColor.y;',
			
			// read matching color in tColorCube0 and tColorCube1
		'	vec4 color0	= sampleAs3DTexture(tColorCube0, srcColor.rgb, cubeWidth);',
		'	vec4 color1	= sampleAs3DTexture(tColorCube1, srcColor.rgb, cubeWidth);',

			// mix colors from each color cubes, and keep the alpha from original screen
		'	gl_FragColor	= vec4(mix(color0, color1, mixAmount).rgb, srcColor.a);',
		'}',
	].join('\n'),
}
