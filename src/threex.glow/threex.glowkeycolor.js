var THREEx	= THREEx || {};

THREEx.GlowKeyColor	= function(renderer, camera, renderTarget, scene){
	scene		= scene	|| new THREE.Scene
	this.scene	= scene
	// setup the RenderTarget
	if( renderTarget === undefined ){
		var textureW	= Math.floor(renderer.domElement.offsetWidth /1)
		var textureH	= Math.floor(renderer.domElement.offsetHeight/1)
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
	composer.addPass( effect )

	// configuration 
	var blurHLevel	= 0.003
	var blurVLevel	= 0.006

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
	
	this.update = function(delta, now) {
		composer.render(delta);
	}
}


THREEx.GlowKeyColor.ColorPassBandShader	= {
	uniforms: {
		tDiffuse	: {
			type	: "t",
			value	: null
		},
		minColor	: {
			type	: "c",
			value	: new THREE.Color().set(0xff0000)
		},
		maxColor	: {
			type	: "c",
			value	: new THREE.Color().set(0xff0000)
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
		'uniform vec3 minColor;',
		'uniform vec3 maxColor;',

		"void main() {",
			"vec4 texel = texture2D( tDiffuse, vUv );",
			"if( greaterThanEqual(texel.xyz, minColor) == bvec3(true)",
			"	&& greaterThanEqual(texel.xyz, maxColor) == bvec3(true) ){",
			// there is likely something better than that to compare 2 vector
			// "if( texel.r >= minColor.r && texel.g >= minColor.g && texel.b >= minColor.b",
			// 	"&& texel.r <= maxColor.r && texel.g <= maxColor.g && texel.b <= maxColor.b){",
				"gl_FragColor = texel;",
			"}else{",
				"gl_FragColor = vec4(0,0,0,0);",
			"}",
		"}",
	].join("\n")
};
