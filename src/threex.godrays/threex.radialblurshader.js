/*!
 * THREE.Extras.Shaders contains extra fSunScreenX shaders like godrays
 * 
 * @author Thibaut 'BKcore' Despoulain <http://bkcore.com>
 * 
 */

var THREEx = THREEx || {};

// Volumetric Light Approximation (Godrays)
THREEx.RadialBlurShader	= {
	uniforms	: {
		tDiffuse	: {type: 't', value: null	},

		fSunScreenX	: {type: 'f', value: 0.5	},
		fSunScreenY	: {type: 'f', value: 0.5	},

		fExposure	: {type: 'f', value: 0.6	},
		fDecay		: {type: 'f', value: 0.93	},
		fDensity	: {type: 'f', value: 0.96	},
		fWeight		: {type: 'f', value: 0.4	},
		fClamp		: {type: 'f', value: 1.0	}
	},
	vertexShader	: [
		'varying vec2 vUv;',

		'void main() {',

			'vUv = vec2( uv.x, 1.0 - uv.y );',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

		'}'
	].join('\n'),

	fragmentShader	: [
		'varying vec2 vUv;',

		'uniform sampler2D tDiffuse;',

		'uniform float	fSunScreenX;',
		'uniform float  fSunScreenY;',

		'uniform float fExposure;',
		'uniform float fDecay;',
		'uniform float fDensity;',
		'uniform float fWeight;',
		'uniform float fClamp;',

		'const int iSamples	= 30;',

		'void main()',
		'{',
			'vec2 coord	 = vec2(vUv.x, 1.0-vUv.y);',
			'vec2 deltaCoord = vec2(coord - vec2(fSunScreenX, fSunScreenY));',
			'deltaCoord	*= 1.0 /  float(iSamples) * fDensity;',
			'float illuminationDecay = 1.0;',
			'vec4 FragColor	 = vec4(0.0);',

			'for(int i=0; i < iSamples; i++){',
				'coord		-= deltaCoord;',
				'vec4 texel	 = texture2D(tDiffuse, coord);',
				'texel		*= illuminationDecay * fWeight;',

				'FragColor	+= texel;',

				'illuminationDecay	*= fDecay;',
			'}',
			'FragColor	*= fExposure;',
			'FragColor	= clamp(FragColor, 0.0, fClamp);',
			'gl_FragColor	= FragColor;',
		'}'
	].join('\n')
};
