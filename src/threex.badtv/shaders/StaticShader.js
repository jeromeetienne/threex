/**
 * @author felixturner / http://airtight.cc/
 *
 * Static effect. Additively blended digital noise.
 *
 * amount - amount of noise to add (0 - 1)
 * size - size of noise grains (pixels)
 *
 */

THREE.StaticShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"time":     { type: "f", value: 0.0 },
		"amount":   { type: "f", value: 0.5 },
		"size":     { type: "f", value: 4.0 }
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
	"uniform float time;",
	"uniform float amount;",
	"uniform float size;",

	"varying vec2 vUv;",

	"float rand(vec2 co){",
		"return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
	"}",

	"void main() {",
		"vec2 p = vUv;",
		"vec4 color = texture2D(tDiffuse, p);",
		"float xs = floor(gl_FragCoord.x / size);",
		"float ys = floor(gl_FragCoord.y / size);",
		"vec4 snow = vec4(rand(vec2(xs * time,ys * time))*amount);",

		//"gl_FragColor = color + amount * ( snow - color );", //interpolate

		"gl_FragColor = color+ snow;", //additive

	"}"

	].join("\n")

};
