/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};




THREEx.depthOfFieldDatGui	= function(depthOfField, datGui){
	datGui	= datGui || new dat.GUI()
	// options
	var options  = {
		focus	: depthOfField.uniforms['focus'].value,
		aperture: depthOfField.uniforms['aperture'].value,
		maxblur	: depthOfField.uniforms['maxblur'].value,
		presetRealist	: function(){
			options.focus	= 0.80
			options.aperture= 0.006
			options.maxblur	= 0.004
			onChange()
		},
		presetExagerated: function(){
			options.focus	= 0.80
			options.aperture= 0.03
			options.maxblur	= 0.015
			onChange()
		},
	}
	var onChange = function(){
		depthOfField.uniforms['focus'].value	= options.focus
		depthOfField.uniforms['aperture'].value	= options.aperture
		depthOfField.uniforms['maxblur'].value	= options.maxblur
	}
	onChange()
	
	// config datGui
	datGui.add( options, 'focus'		, 0.0  , 2   , 0.02500 )
		.listen().onChange( onChange )
	datGui.add( options, 'aperture'	, 0.001, 0.06, 0.0001  )
		.listen().onChange( onChange )
	datGui.add( options, 'maxblur'	, 0.0  , 0.03, 0.00025 )
		.listen().onChange( onChange )
	datGui.add( options, 'presetRealist' )
	datGui.add( options, 'presetExagerated' )
}