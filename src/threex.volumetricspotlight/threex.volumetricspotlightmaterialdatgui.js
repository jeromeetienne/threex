/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addVolumetricSpotlightMaterial2DatGui	= function(material, datGui){
	datGui		= datGui || new dat.GUI()
	var uniforms	= material.uniforms
	// options
	var options  = {
		edgeScale	: uniforms['edgeScale'].value,
		anglePower	: uniforms['anglePower'].value,
		attenuation	: uniforms['attenuation'].value,
		lightColor	: '#'+uniforms.lightColor.value.getHexString(),
		presetR8	: function(){
			if( uniforms.edgeConstractPower ){
				options.edgeConstractPower	= 1.5
			}
			options.edgeScale	= 20.0
			options.anglePower	= 1.2
			options.attenuation	= 5.0
			onChange()
		},
		presetR8G8B8A8	: function(){
			if( uniforms.edgeConstractPower ){
				options.edgeConstractPower	= 1.5
			}
			options.edgeScale	= 0.5
			options.anglePower	= 1.2
			options.attenuation	= 5.0
			onChange()
		},
	}
	if( uniforms.edgeConstractPower ){
		options.edgeConstractPower	= uniforms['edgeConstractPower'].value
	}
	var onChange = function(){
		if( uniforms.edgeConstractPower ){
			uniforms['edgeConstractPower'].value	= options.edgeConstractPower
		}
		uniforms['anglePower'].value	= options.anglePower
		uniforms['attenuation'].value	= options.attenuation
		uniforms['edgeScale'].value	= options.edgeScale
		uniforms.lightColor.value.set( options.lightColor ); 
	}
	onChange()
	
	// config datGui
	if( uniforms.edgeConstractPower ){
		datGui.add( options, 'edgeConstractPower'	, 0.0 , 3)
			.listen().onChange( onChange )
	}
	datGui.add( options, 'anglePower', 0, 10)	.listen().onChange( onChange )
	datGui.add( options, 'attenuation', 0, 10)	.listen().onChange( onChange )
	datGui.add( options, 'edgeScale', 0, 30)	.listen().onChange( onChange )
	datGui.addColor( options, 'lightColor' )	.listen().onChange( onChange )
	datGui.add( options, 'presetR8' )
	datGui.add( options, 'presetR8G8B8A8' )
}