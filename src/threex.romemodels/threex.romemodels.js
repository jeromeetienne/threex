var THREEx	= THREEx	|| {}

THREEx.RomeModels		= {}
THREEx.RomeModels.baseUrl	= '../'

THREEx.RomeModels.load	= function(url, callback){
	var loader	= new THREE.JSONLoader();
	loader.load( url, function(geometry, material){

		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////
		morphColorsToFaceColors(geometry)

		function morphColorsToFaceColors( geometry ) {
			if ( geometry.morphColors && geometry.morphColors.length ) {
				var colorMap = geometry.morphColors[ 0 ];
				for ( var i = 0; i < colorMap.colors.length; i ++ ) {
					geometry.faces[ i ].color = colorMap.colors[ i ];
				}
			}
		}

		geometry.computeMorphNormals();

		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////
		var material	= new THREE.MeshPhongMaterial({
			morphTargets	: true,
			vertexColors	: THREE.FaceColors,
			shading		: THREE.SmoothShading,
			morphNormals	: true,
		})
		var mesh	= new THREE.MorphAnimMesh( geometry, material );
		// mesh.position.z	= -300
		// mesh.position.y	= -0.5
		// mesh.scale.multiplyScalar(1/100)
		// mesh.scale.multiplyScalar(1/1000)
		// mesh.rotation.y	= Math.PI/2

		callback(mesh)
	} );
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

