/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addGlow2DatGui	= function(glow, datGui){
	datGui		= datGui || new dat.GUI()
	var passes	= glow.composer.passes
	// options
	var options  = {
		blurHLevel	: passes[1].uniforms['h'].value,
		blurVLevel	: passes[2].uniforms['v'].value,
		presetLow	: function(){
			options.blurHLevel	= 0.001
			options.blurVLevel	= 0.003
			onChange()
		},
		presetHigh	: function(){
			options.blurHLevel	= 0.003
			options.blurVLevel	= 0.006
			onChange()
		},
	}
	var onChange = function(){
		passes[1].uniforms['h'].value	= options.blurHLevel
		passes[2].uniforms['v'].value	= options.blurVLevel
		passes[3].uniforms['h'].value	= options.blurHLevel
		passes[4].uniforms['v'].value	= options.blurVLevel
	}
	onChange()
	
	// config datGui
	datGui.add( options, 'blurHLevel'	, 0.0 , 0.01)
		.listen().onChange( onChange )
	datGui.add( options, 'blurVLevel'	, 0.0 , 0.01)
		.listen().onChange( onChange )
	datGui.add( options, 'presetLow' )
	datGui.add( options, 'presetHigh' )
}