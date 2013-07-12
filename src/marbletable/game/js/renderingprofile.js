/**
 * store the profile for the rendering
 * 
 * @param  {String+} type a string specifying the type 'normal'/'low'/'high'
 */
var RenderingProfile	= function(type){
	// set argument default values
	type	= type	|| 'normal'
	// set profile values
	this.skymapEnabled	= true
	this.shadowMapEnabled	= true
	this.soundEnabled	= true
	this.devicePixelRatio	= 1

	// specify the profile depending of its preconfigured type
	if( type === 'normal' ){
		// nothing to do
	}else if( type === 'low' ){
		this.skymapEnabled	= false
		this.shadowMapEnabled	= false		
		this.devicePixelRatio	= 1/2
	}else if( type === 'high' ){
	}else	console.assert(false)
}


