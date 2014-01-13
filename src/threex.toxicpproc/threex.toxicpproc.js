var THREEx	= THREEx	|| {};

THREEx.ToxicPproc	= {}

THREEx.ToxicPproc.baseURL	= '../'

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ToxicPproc.passesPreset	= {}

//////////////////////////////////////////////////////////////////////////////////
//		reset preset							//
//////////////////////////////////////////////////////////////////////////////////


THREEx.ToxicPproc.passesPreset['sober']	= {
	init	: function(){
		// hBlurPass
		var uniforms	= this.hBlurTween.dstUniforms
		uniforms.h.value	= 0
		
		// vBlurPass
		var uniforms	= this.vBlurTween.dstUniforms
		uniforms.v.value	= 0

		// rgbRadialPass
		var uniforms	= this.rgbRadialTween.dstUniforms
		uniforms.factor.value	= 0
		uniforms.power.value	= 3.0

		// seeDoublePass
		var uniforms	= this.seeDoubleTween.dstUniforms
		uniforms.radius.value	= 0
		uniforms.timeSpeed.value= 0
		uniforms.mixRatio.value	= 0.5
		uniforms.opacity.value	= 1.0
                		
		// refractionPass
		var uniforms	= this.refractionTween.dstUniforms
		uniforms.timeSpeed.value	= 0
		uniforms.Frequency.value	= 0.0
		uniforms.Amplitude.value	= 0
	},
	update	: function(delta, now){
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		drunk preset							//
//////////////////////////////////////////////////////////////////////////////////


THREEx.ToxicPproc.passesPreset['drunk']	= {
	init	: function(){
		// hBlurPass
		var uniforms	= this.hBlurTween.dstUniforms
		uniforms.h.value= 0.001

		// vBlurPass
		var uniforms	= this.vBlurTween.dstUniforms
		uniforms.v.value= 0.001

		// seeDoublePass
		var uniforms	= this.seeDoubleTween.dstUniforms
		uniforms.radius.value	= 0.03
		uniforms.timeSpeed.value= 1.0

		// refractionPass
		var uniforms	= this.refractionTween.dstUniforms
		uniforms.timeSpeed.value	= 0.2
		uniforms.Frequency.value	= 1.1
		uniforms.Amplitude.value	= 40
	},
	update	: function(delta, now){
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		high preset							//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ToxicPproc.passesPreset['high']	= {
	init	: function(){
		// hBlurPass
		var uniforms	= this.hBlurTween.dstUniforms
		uniforms.h.value= 0.001

		// vBlurPass
		var uniforms	= this.vBlurTween.dstUniforms
		uniforms.v.value= 0.001

		// rgbRadialPass
		var uniforms	= this.rgbRadialTween.dstUniforms
		uniforms.factor.value	= 0.02
		uniforms.power.value	= 3.0

		// seeDoublePass
		// var uniforms	= this.seeDoubleTween.dstUniforms
		// uniforms.radius.value	= 0.03
		// uniforms.timeSpeed.value= 1.0

		// refractionPass
		var uniforms	= this.refractionTween.dstUniforms
		uniforms.timeSpeed.value	= 0.25
		uniforms.Frequency.value	= 1.1
		uniforms.Amplitude.value	= 40
	},
	update	: function(delta, now){
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		wasted preset							//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ToxicPproc.passesPreset['wasted']	= {
	init	: function(){
		// hBlurPass
		var uniforms	= this.hBlurTween.dstUniforms
		uniforms.h.value= 0.001

		// vBlurPass
		var uniforms	= this.vBlurTween.dstUniforms
		uniforms.v.value= 0.001

		// rgbRadialPass
		var uniforms	= this.rgbRadialTween.dstUniforms
		uniforms.factor.value	= 0.05
		uniforms.power.value	= 3.0

		// seeDoublePass
		// var uniforms	= this.seeDoubleTween.dstUniforms
		// uniforms.radius.value	= 0.03
		// uniforms.timeSpeed.value= 1.0

		// refractionPass
		var uniforms	= this.refractionTween.dstUniforms
		uniforms.timeSpeed.value	= 0.5
		uniforms.Frequency.value	= 2.2
		uniforms.Amplitude.value	= 60
	},
	update	: function(delta, now){
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * how to change so it is usable in a existing post processing chain ?
 * - possibility: 
 *   - put only the effect in a class
 *   - put the renderer in another
 */

THREEx.ToxicPproc.Passes	= function(presetLabel){
	// default value arguments
	presetLabel	= presetLabel	|| 'sober'
	// internal update function
	var onUpdateFcts= []
	this.update	= function(delta, now){
		onUpdateFcts.forEach(function(onUpdateFct){
			onUpdateFct(delta, now)
		}.bind(this))
	} 

	// Presets
	var preset	= THREEx.ToxicPproc.passesPreset[presetLabel]
	this.setPreset	= function(label){
		// reset of all values
		THREEx.ToxicPproc.passesPreset['sober'].init.apply(this)

		preset	= THREEx.ToxicPproc.passesPreset[label]
		preset.init.apply(this)
		
		hBlurTween.needsUpdate		= true
		vBlurTween.needsUpdate		= true
		rgbRadialTween.needsUpdate	= true
		seeDoubleTween.needsUpdate	= true
		refractionTween.needsUpdate	= true
	}
	
	// update all tween
	onUpdateFcts.push(function(delta, now){
		hBlurTween.update(delta, now)
		vBlurTween.update(delta, now)
		rgbRadialTween.update(delta, now)
		seeDoubleTween.update(delta, now)
		refractionTween.update(delta, now)
	})
	
	
	/**
	 * to add toxicPasses to a THREE.EffectComposer
	 * @param {THREE.EffectComposer} composer the composer to which it is added
	 */
	this.addPassesTo	= function(composer){
		composer.addPass(hBlurPass)
		composer.addPass(vBlurPass)
		composer.addPass(rgbRadialPass)
		composer.addPass(seeDoublePass)
		composer.addPass(refractionPass)
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		init all Passes and Tweens					//
	//////////////////////////////////////////////////////////////////////////////////
	

	// hBlurPass
	var hBlurPass	= this.hBlurPass	= new THREE.ShaderPass( THREE.HorizontalBlurShader );
	var hBlurTween	= this.hBlurTween	= new THREEx.UniformsTween(hBlurPass.uniforms, {
		h	: THREEx.UniformsTween.Easing.Linear.None,
	})

	// vBlurPass
	var vBlurPass	= this.vBlurPass	= new THREE.ShaderPass( THREE.VerticalBlurShader );
	var vBlurTween	= this.vBlurTween	= new THREEx.UniformsTween(vBlurPass.uniforms, {
		v	: THREEx.UniformsTween.Easing.Linear.None,
	})

	// rgbRadialPass
	var rgbRadialPass	= this.rgbRadialPass	= new THREE.ShaderPass( THREEx.ToxicPproc.RGBShiftRadialShader)
	var rgbRadialTween	= this.rgbRadialTween	= new THREEx.UniformsTween(rgbRadialPass.uniforms, {
		factor		: THREEx.UniformsTween.Easing.Linear.None,
	})

	// seeDoublePass
	var seeDoublePass	= this.seeDoublePass	= new THREE.ShaderPass( THREEx.ToxicPproc.SeeDoubleShader)
	var seeDoubleTween	= this.seeDoubleTween	= new THREEx.UniformsTween(seeDoublePass.uniforms, {
		radius		: THREEx.UniformsTween.Easing.Linear.None,
		timeSpeed	: THREEx.UniformsTween.Easing.Linear.None,
	})

	// refractionPass
	var refractionPass	= this.refractionPass	= new THREE.ShaderPass( THREEx.ToxicPproc.RefractionShader)
	var refractionTween	= this.refractionTween	= new THREEx.UniformsTween(refractionPass.uniforms, {
		timeSpeed	: THREEx.UniformsTween.Easing.Linear.None,
		RandomNumber	: THREEx.UniformsTween.Easing.Linear.None,
		Period		: THREEx.UniformsTween.Easing.Linear.None,
		Frequency	: THREEx.UniformsTween.Easing.Linear.None,
		Amplitude	: THREEx.UniformsTween.Easing.Linear.None,
	})


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	

	// reset of all values
	THREEx.ToxicPproc.passesPreset['sober'].init.apply(this)
	// init current preset
	preset.init.apply(this)
	onUpdateFcts.push(function(delta, now){
		// update .time in the needed Pass
		// seeDoublePass
		var uniforms	= seeDoublePass.uniforms
		uniforms.time.value	+= delta * uniforms.timeSpeed.value;
		// refractionPass
		var uniforms	= refractionPass.uniforms
		uniforms.time.value	+= delta * uniforms.timeSpeed.value;		

		// update current preset
		preset.update.apply(this, [delta, now])		
	}.bind(this))
}

//////////////////////////////////////////////////////////////////////////////////
//		Shaders								//
//////////////////////////////////////////////////////////////////////////////////


THREEx.ToxicPproc.RGBShiftRadialShader = {
	uniforms	: {
		"tDiffuse"	: { type: "t", value: null },
		"factor"	: { type: "f", value: 0 },
		"power"		: { type: "f", value: 3 },
	},

	vertexShader	: [
		'varying vec2 vUv;',
		'void main() {',
			'vUv = uv;',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}'
	].join('\n'),

	fragmentShader	: [

		'uniform sampler2D tDiffuse;',

		'uniform float factor;',
		'uniform float power;',

		'varying vec2 vUv;',

		'void main() {',

/**
 * * compute vector to the center. toCenter vector2
 * * compute unit vector to center
 * * offset length depends on toCenter length
 */

 			'vec2 vector2Center	= vec2(0.5)-vUv;',
 			'vec2 unit2Center	= vector2Center / length(vector2Center);',

 			'float offsetLength	= length(vector2Center) * factor;',
 			'offsetLength		= 1.0 - pow(1.0-offsetLength, power);',
 			'vec2  offset		= unit2Center * offsetLength;',
 			
			'vec4 cr	= texture2D(tDiffuse, vUv + offset);',
			'vec4 cga	= texture2D(tDiffuse, vUv);',
			'vec4 cb	= texture2D(tDiffuse, vUv - offset);',
			'gl_FragColor	= vec4(cr.r, cga.g, cb.b, cga.a);',
		'}'
	].join("\n")
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


THREEx.ToxicPproc.SeeDoubleShader = {
	uniforms: {
		tDiffuse	: { type: "t", value: null	},

		time		: { type: "f", value: 0.0 	},
		timeSpeed	: { type: "f", value: 1.0 	},


		radius		: { type: "f", value: 0.01 	},

                mixRatio	: { type: "f", value: 0.5	},
                opacity		: { type: "f", value: 1.0	},
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
		"uniform float time;",
		"uniform float radius;",

		"uniform float opacity;",
		"uniform float mixRatio;",

		"void main() {",
			"float angle	= time;",
			"vec2 offset	= vec2(cos(angle), sin(angle*2.0))*radius;",
			"vec4 original	= texture2D(tDiffuse, vUv);",
			"vec4 shifted	= texture2D(tDiffuse, vUv + offset);",
			"gl_FragColor	= opacity * mix( original, shifted, mixRatio );",
		"}"
	].join("\n")
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


// from http://devmaster.net/posts/3079/shader-effects-refraction#tabs-3
THREEx.ToxicPproc.RefractionShader	= {
	uniforms	: {
		tDiffuse	: {type: "t", value: null },
		ImageSize	: {type : "v2", value: new THREE.Vector2(1440,900) },
		TexelSize	: {type : "v2", value: new THREE.Vector2(1.0/1440,1.0/900) },
		time		: {type: "f", value: 0.0 		},
		timeSpeed	: {type: "f", value: 1.0 		},

		RandomNumber	: {type: 'f', value: Math.random()	},
		Period		: {type: 'f', value: Math.PI/2		},
		Frequency	: {type: 'f', value: 10.0		},
		Amplitude	: {type: 'f', value: 0			},
	},
	vertexShader	: [
		'varying vec2 vUv;',

		'void main() {',

			'vUv = uv;',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

		'}'
	].join('\n'),

	fragmentShader	: [
		'// <summary>',
		'// Shader to refract all pixels with their alpha channel set to 0.',
		'// </summary>',
		'',
		'',
		'#ifdef GL_ES',
		'	precision highp float;',
		'#endif',
		'',
		'uniform float time;',
		'uniform float speed;',
		'',
		'// Uniform variables.',
		'uniform vec2 ImageSize;',
		'uniform vec2 TexelSize;',
		'uniform sampler2D tDiffuse;',
		'',
		'// Size of the refraction.',
		'uniform float Amplitude;',
		'',
		'// Frequency of the refraction.',
		'uniform float Frequency;',
		'',
		'// Relative speed (period) of the refraction.',
		'uniform float Period;',
		'',
		'// Random number to animate or mix up the refracted results.',
		'uniform float RandomNumber;',
		'',
		'',
		'// Varying variables.',
		'varying vec2 vUv;',
		'',
		'',
		// TODO put that 
		'// Description : Array and textureless GLSL 3D simplex noise function.',
		'//      Author : Ian McEwan, Ashima Arts.',
		'//  Maintainer : ijm',
		'//     Lastmod : 20110822 (ijm)',
		'//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.',
		'//               Distributed under the MIT License. See LICENSE file.',
		'//               https://github.com/ashima/webgl-noise',
		'vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }',
		'vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }',
		'vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }',
		'vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }',
		'float snoise(vec3 v)',
		'{ ',
		'  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;',
		'  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);',
		'',
		'  // First corner',
		'  vec3 i  = floor(v + dot(v, C.yyy) );',
		'  vec3 x0 =   v - i + dot(i, C.xxx) ;',
		'',
		'  // Other corners',
		'  vec3 g = step(x0.yzx, x0.xyz);',
		'  vec3 l = 1.0 - g;',
		'  vec3 i1 = min( g.xyz, l.zxy );',
		'  vec3 i2 = max( g.xyz, l.zxy );',
		'',
		'  //   x0 = x0 - 0.0 + 0.0 * C.xxx;',
		'  //   x1 = x0 - i1  + 1.0 * C.xxx;',
		'  //   x2 = x0 - i2  + 2.0 * C.xxx;',
		'  //   x3 = x0 - 1.0 + 3.0 * C.xxx;',
		'  vec3 x1 = x0 - i1 + C.xxx;',
		'  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y',
		'  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y',
		'',
		'  // Permutations',
		'  i = mod289(i); ',
		'  vec4 p = permute( permute( permute( ',
		'             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))',
		'           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) ',
		'           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));',
		'',
		'  // Gradients: 7x7 points over a square, mapped onto an octahedron.',
		'  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)',
		'  float n_ = 0.142857142857; // 1.0/7.0',
		'  vec3  ns = n_ * D.wyz - D.xzx;',
		'',
		'  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)',
		'',
		'  vec4 x_ = floor(j * ns.z);',
		'  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)',
		'',
		'  vec4 x = x_ *ns.x + ns.yyyy;',
		'  vec4 y = y_ *ns.x + ns.yyyy;',
		'  vec4 h = 1.0 - abs(x) - abs(y);',
		'',
		'  vec4 b0 = vec4( x.xy, y.xy );',
		'  vec4 b1 = vec4( x.zw, y.zw );',
		'',
		'  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;',
		'  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;',
		'  vec4 s0 = floor(b0)*2.0 + 1.0;',
		'  vec4 s1 = floor(b1)*2.0 + 1.0;',
		'  vec4 sh = -step(h, vec4(0.0));',
		'',
		'  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;',
		'  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;',
		'',
		'  vec3 p0 = vec3(a0.xy,h.x);',
		'  vec3 p1 = vec3(a0.zw,h.y);',
		'  vec3 p2 = vec3(a1.xy,h.z);',
		'  vec3 p3 = vec3(a1.zw,h.w);',
		'',
		'  //Normalise gradients',
		'  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));',
		'  p0 *= norm.x;',
		'  p1 *= norm.y;',
		'  p2 *= norm.z;',
		'  p3 *= norm.w;',
		'',
		'  // Mix final noise value',
		'  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
		'  m = m * m;',
		'  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), ',
		'                                dot(p2,x2), dot(p3,x3) ) );',
		'}',


		'// <summary>',
		'// Compute the normal using a sobel filter on the adjacent noise pixels.',
		'//',
		'// Normally you would output the noise to a texture first and then calculate',
		'// the normals on that texture to improve performance; however everthing is',
		'// kept in this shader as a single process to help illustrate whats going on.',
		'// <summary>',
		'// <returns>A normal vector.</returns>',
		'vec3 GetNormal ()',
		'{',
		'	// Get Sobel values',
		'	vec2 uv = vUv * Frequency;',
		'	float z = RandomNumber * Period + time;',
		'	',
		'	float tl = snoise(vec3(uv.x - TexelSize.x, uv.y - TexelSize.y, z));',
		'	float t  = snoise(vec3(uv.x, uv.y - TexelSize.y, z));',
		'	float tr = snoise(vec3(uv.x + TexelSize.x, uv.y - TexelSize.y, z));',
		'	float l  = snoise(vec3(uv.x - TexelSize.x, uv.y, z));',
		'	float r  = snoise(vec3(uv.x + TexelSize.x, uv.y, z));',
		'	float bl = snoise(vec3(uv.x - TexelSize.x, uv.y + TexelSize.y, z));',
		'	float b  = snoise(vec3(uv.x, uv.y + TexelSize.y, z));',
		'	float br = snoise(vec3(uv.x + TexelSize.x, uv.y + TexelSize.y, z));',
		'',
		'	// Sobel filter',
		'	vec3 normal = vec3((-tl - l * 2.0 - bl) + (tr + r * 2.0 + br),',
		'				(-tl - t * 2.0 - tr) + (bl + b * 2.0 + br),',
		'				1.0 / Amplitude);',
		'						',
		'	// Return normalized vector',
		'	return normalize(normal);',
		'}',

		'void main (){',
		'	// Refract only tagged pixels (that is, the alpha channel has been set)',
		'	vec2 offset;',

		'	// Method 1: Use noise as the refraction angle.',
		'	// Fast and good results for some scenarios.',
		'	const float pi = 3.141592;',
		'	float noise = snoise(vec3((vUv * Frequency), RandomNumber * Period + time)) * pi;',
		'	offset = vec2(cos(noise), sin(noise)) * Amplitude * TexelSize;',
		'	',
		// '	// Method 2: Get the normal from an animating normalmap to use as the refracted vector.',
		// '	// Slower, but better results.',
		// '	vec3 normal = GetNormal();',
		// '	offset = normal.xy;',
		'	',
		'	// Use the colour at the specified offset into the texture',
		'	gl_FragColor = texture2D(tDiffuse, vUv + offset);',
		'}',
	].join('\n')
};

