var THREEx	= THREEx	|| {}

THREEx.RomeModels		= {}
THREEx.RomeModels.baseUrl	= '../'

THREEx.RomeModels.load	= function(url, callback){
	var options	= {
		smoothShading	: true,
		morphColors	: true,
	}
	var loader	= new THREE.JSONLoader();
	loader.load( url, function(geometry, material){
		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////
		var material	= new THREE.MeshPhongMaterial({
			morphTargets	: true
		})

		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////
		if( options.morphColors === true ){
			morphColorsToFaceColors(geometry)
			material.vertexColors	= THREE.FaceColors
		}
		if( options.smoothShading === true ){
			geometry.computeMorphNormals();
			material.shading	= THREE.SmoothShading
			material.morphNormals	= true
		}

		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////
		var mesh	= new THREE.MorphAnimMesh( geometry, material );

		callback(mesh)
	} );

	// utils funcitons
	function morphColorsToFaceColors( geometry ) {
		if ( geometry.morphColors && geometry.morphColors.length ) {
			var colorMap = geometry.morphColors[ 0 ];
			for ( var i = 0; i < colorMap.colors.length; i ++ ) {
				geometry.faces[ i ].color = colorMap.colors[ i ];
			}
		}
	}
}

THREEx.RomeModels.loadHorse	= function(callback){
	var url		= this.baseUrl + 'models/horse.js'
	this.load(url, function(mesh){
		mesh.scale.multiplyScalar(1/200)

		callback(mesh)
	})
}

THREEx.RomeModels.loadParrot	= function(callback){
	var url		= this.baseUrl + 'models/parrot.js'
	this.load(url, function(mesh){
		mesh.scale.multiplyScalar(1/200)

		callback(mesh)
	})
}

THREEx.RomeModels.loadFlamingo	= function(callback){
	var url		= this.baseUrl + 'models/flamingo.js'
	this.load(url, function(mesh){
		mesh.scale.multiplyScalar(1/200)

		callback(mesh)
	})
}


THREEx.RomeModels.loadStork	= function(callback){
	var url		= this.baseUrl + 'models/stork.js'
	this.load(url, function(mesh){
		mesh.scale.multiplyScalar(1/200)

		callback(mesh)
	})
}

