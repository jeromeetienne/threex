var RenderingProfile	= function(type){
	// set argument default values
	type	= type	|| 'normal'
	// set profile values
	this.skymapEnabled	= true
	this.shadowMapEnabled	= true

	// specify the profile depending of its preconfigured type
	if( type === 'normal' ){
		// nothing to do
	}else if( type === 'low' ){
		this.skymapEnabled	= false
		this.shadowMapEnabled	= false		
	}else	console.assert(false)
}
