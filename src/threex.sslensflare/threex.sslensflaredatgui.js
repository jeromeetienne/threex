/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addSsLensFlare2DatGui	= function(ssLensFlare, blendPass, datGui){
	datGui		= datGui || new dat.GUI()


	var thresholdShaderUniforms	= ssLensFlare.composer.passes[1].uniforms
	var blendShaderUniforms		= blendPass.uniforms
	var featureShaderUniforms	= ssLensFlare.composer.passes[2].uniforms
	
	// options
	var options  = {
		threshold	: 0.9,
		blendScale	: 10,
		blendRatio	: 0.5,

		uGhosts		: featureShaderUniforms['uGhosts'].value,
		uGhostDispersal	: featureShaderUniforms['uGhostDispersal'].value,
		uHaloWidth	: featureShaderUniforms['uHaloWidth'].value,
		uDistortion	: featureShaderUniforms['uDistortion'].value,
		
		preset	: function(){
			options.threshold	= 0.6
			onChange()
		},
	}
	var onChange = function(){
		// convert option.threshold into proper uniforms formulas
		var uScale	= 1/(1-options.threshold)
		var uBias	= -options.threshold
		thresholdShaderUniforms['uScale'].value.set(uScale,uScale,uScale,1)
		thresholdShaderUniforms['uBias'].value.set(uBias, uBias, uBias, 0.0)


		featureShaderUniforms['uGhosts'].value		= options.uGhosts
		featureShaderUniforms['uGhostDispersal'].value	= options.uGhostDispersal
		featureShaderUniforms['uHaloWidth'].value	= options.uHaloWidth
		featureShaderUniforms['uDistortion'].value	= options.uDistortion


		blendShaderUniforms['scale'].value	= options.blendScale
		blendShaderUniforms['mixRatio'].value	= options.blendRatio
		// blendShaderUniforms['opacity'].value	= 1.0 - options.blendRatio
	}
	onChange()
	
	// config datGui
	datGui.add( options, 'threshold', 0, 1)		.listen().onChange( onChange )
	datGui.add( options, 'blendScale', 0, 30)	.listen().onChange( onChange )

	datGui.add( options, 'blendRatio', 0, 1)	.listen().onChange( onChange )

	datGui.add( options, 'uGhosts', 0, 12).step(1)	.listen().onChange( onChange )
	datGui.add( options, 'uGhostDispersal', 0, 1)	.listen().onChange( onChange )
	datGui.add( options, 'uHaloWidth', 0, 2)	.listen().onChange( onChange )
	datGui.add( options, 'uDistortion', 0, 200)	.listen().onChange( onChange )

	datGui.add( options, 'preset' )
}