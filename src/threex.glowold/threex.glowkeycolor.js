var THREEx	= THREEx || {};

THREEx.GlowKeyColor	= function(renderer, camera, renderTarget, scene){
	scene		= scene	|| new THREE.Scene
	this.scene	= scene
	// setup the RenderTarget
	if( renderTarget === undefined ){
		var textureW	= Math.floor(renderer.domElement.offsetWidth /2)
		var textureH	= Math.floor(renderer.domElement.offsetHeight/2)
		renderTarget	= new THREE.WebGLRenderTarget(textureW, textureH, {
			minFilter	: THREE.LinearFilter,
			magFilter	: THREE.LinearFilter,
			format		: THREE.RGBFormat
		})		
	}
	this.renderTarget = renderTarget
	
	// create the composer
	var composer	= new THREE.EffectComposer( renderer, renderTarget );
	this.composer	= composer

	// add Render Pass
	var effect	= new THREE.RenderPass(scene, camera);
	composer.addPass( effect )
	
;(function(){	// experiment to have only one renderPass
	// create the effect
	var renderTarget	= new THREE.WebGLRenderTarget(textureW, textureH, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.LinearFilter,
		format		: THREE.RGBFormat
	});
	var effect	= new THREE.SavePass(renderTarget);
	composer.addPass( effect )
})()

	var effect	= new THREE.ShaderPass( THREEx.GlowKeyColor.ColorPassBandShader )
	this.filterEffect	= effect
	composer.addPass( effect )

	// configuration 
	var blurHLevel	= 0.001
	var blurVLevel	= 0.002

	console.assert( THREE.HorizontalBlurShader )
	console.assert( THREE.VerticalBlurShader )

	// add HorizontalBlur Pass
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader )
	effect.uniforms[ 'h' ].value	= blurHLevel 
	composer.addPass( effect )
	// add Vertical Pass
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader )
	effect.uniforms[ 'v' ].value	= blurVLevel
	composer.addPass( effect )

	// add HorizontalBlur Pass
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader )
	effect.uniforms[ 'h' ].value	= blurHLevel 
	composer.addPass( effect )
	// add Vertical Pass
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader )
	effect.uniforms[ 'v' ].value	= blurVLevel
	composer.addPass( effect )
	
	// add HorizontalBlur Pass
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader )
	effect.uniforms[ 'h' ].value	= blurHLevel 
	composer.addPass( effect )
	// add Vertical Pass
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader )
	effect.uniforms[ 'v' ].value	= blurVLevel
	composer.addPass( effect )
	
	// add HorizontalBlur Pass
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader )
	effect.uniforms[ 'h' ].value	= blurHLevel 
	composer.addPass( effect )
	// add Vertical Pass
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader )
	effect.uniforms[ 'v' ].value	= blurVLevel
	composer.addPass( effect )
	
	this.update = function(delta, now) {
		composer.render(delta);
	}
}

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Blend two textures
 */
THREEx.GlowKeyColor.BlendShader = {

	uniforms: {

		"tDiffuse1"	: { type: "t", value: null },
		"tDiffuse2"	: { type: "t", value: null },
		"mixRatio"	: { type: "f", value: 0.5 },
		"opacity"	: { type: "f", value: 1.0 },
		keyColor	: {
			type	: "c",
			value	: new THREE.Color().set('red')
		},
		glowColor	: {
			type	: "c",
			value	: new THREE.Color().set('red')
		},
	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",
		"uniform float mixRatio;",

		"uniform sampler2D tDiffuse1;",
		"uniform sampler2D tDiffuse2;",

		"varying vec2 vUv;",
		'uniform vec3 keyColor;',
		'uniform vec3 glowColor;',

		"void main() {",

			"vec4 texel1 = texture2D( tDiffuse1, vUv );",
			"vec4 texel2 = texture2D( tDiffuse2, vUv );",

			"if( equal(texel1.xyz, keyColor) == bvec3(true) ){",
				"texel1	= vec4(glowColor, 1);",
			"}",
			"gl_FragColor	= opacity * mix( texel1, texel2, mixRatio );",

			// "if( equal(texel1.xyz, keyColor) == bvec3(true) ){",
			// 	"gl_FragColor	= vec4(glowColor, 1);",
			// "}else{",
			// 	"gl_FragColor	= opacity * mix( texel1, texel2, mixRatio );",
			// "}",

		"}"

	].join("\n")

};

THREEx.GlowKeyColor.ColorPassBandShader	= {
	uniforms: {
		tDiffuse	: {
			type	: "t",
			value	: null
		},
		keyColor	: {
			type	: "c",
			value	: new THREE.Color().set('red')
		},
		glowColor	: {
			type	: "c",
			value	: new THREE.Color().set('red')
		},
	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [ 

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",
		'uniform vec3 keyColor;',
		'uniform vec3 glowColor;',

		"void main() {",
			"vec4 texel = texture2D( tDiffuse, vUv );",
			"if( equal(texel.xyz, keyColor) == bvec3(true) ){",
				"gl_FragColor = vec4(glowColor, 0);",
			"}else{",
				"gl_FragColor = vec4(0,0,0,0);",
			"}",
		"}",
	].join("\n")
};
