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
	this.soundEnabled	= false
	this.rendererAntialias	= true
	this.devicePixelRatio	= 1
	this.playerLiveMirror	= true

	// specify the profile depending of its preconfigured type
	if( type === 'normal' ){
		// nothing to do
	}else if( type === 'low' ){
		this.skymapEnabled	= false
		this.shadowMapEnabled	= false		
		this.devicePixelRatio	= 1/2
		this.playerLiveMirror	= false
	}else if( type === 'mobile' ){
		this.skymapEnabled	= false
		this.shadowMapEnabled	= false
		this.soundEnabled	= false
		this.rendererAntialias	= false
		this.devicePixelRatio	= 1/2
		this.playerLiveMirror	= false
	}else	console.assert(false)
}


