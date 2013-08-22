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
	var hBlurShaderUniforms1	= ssLensFlare.composer.passes[3].uniforms
	var vBlurShaderUniforms1	= ssLensFlare.composer.passes[4].uniforms
	var hBlurShaderUniforms2	= ssLensFlare.composer.passes[5].uniforms
	var vBlurShaderUniforms2	= ssLensFlare.composer.passes[6].uniforms
	
	// options
	var options  = {
		// threshold
		threshold	: 0.9,
		
		// feature
		uGhostDispersal	: featureShaderUniforms['uGhostDispersal'].value,
		uHaloWidth	: featureShaderUniforms['uHaloWidth'].value,
		uDistortion	: featureShaderUniforms['uDistortion'].value,

		// blend
		artefactScale	: 10,
		blendRatio	: 0.5,
		blendLensOnly	: function(){
			options.blendRatio	= 1.0;
			onChange()
		},
		blendDefault	: function(){
			options.blendRatio	= 0.5;
			onChange()
		},

		// blur
		horizontalBlur	: hBlurShaderUniforms1['h'].value,
		verticalBlur	: vBlurShaderUniforms1['v'].value,
		blurNone	: function(){
			options.horizontalBlur	= 0
			options.verticalBlur	= 0
			onChange()
		},
		blurLow	: function(){
			options.horizontalBlur	= 0.002
			options.verticalBlur	= 0.006
			onChange()
		},
		blurHigh	: function(){
			options.horizontalBlur	= 0.006
			options.verticalBlur	= 0.010
			onChange()
		},
	}
	var onChange = function(){
		// threshold
		var uScale	= 1/(1-options.threshold)
		var uBias	= -options.threshold
		thresholdShaderUniforms['uScale'].value.set(uScale,uScale,uScale,1)
		thresholdShaderUniforms['uBias'].value.set(uBias, uBias, uBias, 0.0)

		// feature
		featureShaderUniforms['uGhostDispersal'].value	= options.uGhostDispersal
		featureShaderUniforms['uHaloWidth'].value	= options.uHaloWidth
		featureShaderUniforms['uDistortion'].value	= options.uDistortion

		// blur
		hBlurShaderUniforms1['h'].value	= options.horizontalBlur
		vBlurShaderUniforms1['v'].value	= options.verticalBlur
		hBlurShaderUniforms2['h'].value	= options.horizontalBlur
		vBlurShaderUniforms2['v'].value	= options.verticalBlur

		// blend
		blendShaderUniforms['artefactScale'].value	= options.artefactScale
		blendShaderUniforms['mixRatio'].value	= options.blendRatio
		// blendShaderUniforms['opacity'].value	= 1.0 - options.blendRatio
	}
	onChange()
	
	// config datGui
	datGui.add( options, 'threshold', 0, 1)		.listen().onChange( onChange )

	var folder	= datGui.addFolder('Features');
	folder.add( options, 'uGhostDispersal', 0, 1)	.listen().onChange( onChange )
	folder.add( options, 'uHaloWidth', 0, 2)	.listen().onChange( onChange )
	folder.add( options, 'uDistortion', 0, 200)	.listen().onChange( onChange )
	// folder.open()

	var folder	= datGui.addFolder('Blend');
	folder.add( options, 'blendRatio', 0, 1)	.listen().onChange( onChange )
	folder.add( options, 'artefactScale', 0, 30)	.listen().onChange( onChange )
	folder.add( options, 'blendLensOnly' )
	folder.add( options, 'blendDefault' )
	// folder.open()

	var folder	= datGui.addFolder('Blur');
	folder.add( options, 'horizontalBlur', 0, 0.01)	.listen().onChange( onChange )
	folder.add( options, 'verticalBlur', 0, 0.01)	.listen().onChange( onChange )
	folder.add( options, 'blurNone' )
	folder.add( options, 'blurLow' )
	folder.add( options, 'blurHigh' )
	// folder.open()
	
	// datGui.close()
}