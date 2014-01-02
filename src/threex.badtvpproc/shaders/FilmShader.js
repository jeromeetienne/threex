/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Film grain & scanlines shader
 *
 * - ported from HLSL to WebGL / GLSL
 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Screen Space Static Postprocessor
 *
 * Produces an analogue noise overlay similar to a film grain / TV static
 *
 * Original implementation and noise algorithm
 * Pat 'Hawthorne' Shearon
 *
 * Optimized scanlines + noise version with intensity scaling
 * Georg 'Leviathan' Steinrohder
 *
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */

THREE.FilmShader = {

	uniforms: {

		"tDiffuse":   { type: "t", value: null },
		"time":       { type: "f", value: 0.0 },
		"nIntensity": { type: "f", value: 0.5 },
		"sIntensity": { type: "f", value: 0.05 },
		"sCount":     { type: "f", value: 4096 },
		"grayscale":  { type: "i", value: 1 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		// control parameter
		"uniform float time;",

		"uniform bool grayscale;",

		// noise effect intensity value (0 = no effect, 1 = full effect)
		"uniform float nIntensity;",

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		"uniform float sIntensity;",

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		"uniform float sCount;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"float rand(vec2 co){",

    	"return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",

    	"}",


		"void main() {",

			// sample the source
			"vec4 cTextureScreen = texture2D( tDiffuse, vUv );",

			// make some noise
			// "float x = vUv.x * vUv.y * time *  1000.0;",
			// "x = mod( x, 13.0 ) * mod( x, 123.0 );",
			// "float dx = mod( x, 0.01 );",

			// add noise
			//"vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );",
			
			//no noise
			//"vec3 cResult = cTextureScreen.rgb;",

			// "vec2 position = gl_FragCoord.xy - floor(time*4.0);",
			// "vec3 cResult = cTextureScreen.rgb + rand(position.xy)*0.3;",

			// float color = rand( position.xy );

			// gl_FragColor = vec4( color, color, color, 1 );

			//from http://glsl.heroku.com/e#6017.0
			//vec2 position = gl_FragCoord.xy - floor(mouse*resolution);
			//float color = rand( position.xy );
			//gl_FragColor = vec4( color, color, color, 1 );




			//fat noise
			// "float res = 16.0;",
			//  "float xStepped = floor((gl_FragCoord.x + time)*res);",
			//  "float yStepped = floor((gl_FragCoord.y + time)*res);",
			//  "vec3 cResult = cTextureScreen.rgb + vec3(rand(vec2(xStepped,yStepped))-0.5)*0.3;",


			"vec3 cResult = cTextureScreen.rgb;",


			// get us a sine and cosine
			"vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",

			// add scanlines
			"cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;",

			// interpolate between source and result by intensity
			"cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",

			// convert to grayscale if desired
			// "if( grayscale ) {",

			// 	"cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );",

			// "}",

			"gl_FragColor =  vec4( cResult, cTextureScreen.a );",

		"}"

	].join("\n")

};
