var THREEx	= THREEx	|| {}

THREEx.LightPool	= function(klass, nPrealloc){
	klass		= klass || THREE.Light
	nPrealloc	= nPrealloc !== undefined ? nPrealloc : 0
	var pool	= []
	this.pool	= pool

	var scene	= game.scene
	this.push	= function(light){
		console.assert(light instanceof klass)
		pool.push(light)

		light.userData.lightPoolIntensity	= light.intensity
		light.intensity	= 0
		scene.add(light)
	}
	this.pop	= function(){
		var light	= pool.pop()
		if( light === undefined )	return light
		light.intensity	= light.userData.lightPoolIntensity
		delete light.userData.lightPoolIntensity
		return light
	}

	// preallocation
	for(var i = 0; i < nPrealloc; i++ ){
		this.push( new klass() )
	} 
}
