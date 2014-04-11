var THREEx	= THREEx	|| {}

THREEx.createGrassTufts	= function(positions){
	// create the initial geometry
	var geometry	= new THREE.PlaneGeometry(0.4, 0.2)
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, geometry.height/2, 0 ) );
	// geometry.computeVertexNormals();

	// change the normal to get better lighting
	// - normals inspired from http://simonschreibt.de/gat/airborn-trees/
	// geometry.faces[0].vertexNormals[0].set(-0.2,1.0,4.0).normalize()
	// geometry.faces[0].vertexNormals[1].set(-0.2,0.5,4.0).normalize()
	// geometry.faces[0].vertexNormals[2].set(+0.2,0.5,4.0).normalize()
	// geometry.faces[0].vertexNormals[3].set(+0.2,1.0,4.0).normalize()

	// normals from http://http.developer.nvidia.com/GPUGems/gpugems_ch07.html
	geometry.faces[0].vertexNormals[0].set(0.0,1.0,0.0).normalize()
	geometry.faces[0].vertexNormals[1].set(0.0,1.0,0.0).normalize()
	geometry.faces[0].vertexNormals[2].set(0.0,1.0,0.0).normalize()
	geometry.faces[0].vertexNormals[3].set(0.0,1.0,0.0).normalize()
	
	// create each tuft and merge their geometry for performance
	var mergedGeo	= new THREE.Geometry();
	for(var i = 0; i < positions.length; i++){
		var position	= positions[i]			
		var baseAngle	= Math.PI*2*Math.random()

		var nPlanes	= 2
		for(var j = 0; j < nPlanes; j++){
			var angle	= baseAngle+j*Math.PI/nPlanes

			// first plane			
			var object3d	= new THREE.Mesh(geometry, material)
			object3d.rotateY(angle)
			object3d.position.copy(position)
			THREE.GeometryUtils.merge( mergedGeo, object3d );

			// the other side of the plane
			// - impossible to use side : THREE.BothSide as it would mess up the normals
			var object3d	= new THREE.Mesh(geometry, material)
			object3d.rotateY(angle+Math.PI)
			object3d.position.copy(position)
			THREE.GeometryUtils.merge( mergedGeo, object3d );
		}
	}


	// load the texture
	var textureUrl	= THREEx.createGrassTufts.baseUrl+'images/grass01.png'
	// var textureUrl	= THREEx.createGrassTufts.baseUrl+'images/bai_large/grass01.png'
	// var textureUrl	= THREEx.createGrassTufts.baseUrl+'images/bai_large/grass02.png'
	// var textureUrl	= THREEx.createGrassTufts.baseUrl+'images/bai_large/flowers01.png'
	// var textureUrl	= THREEx.createGrassTufts.baseUrl+'images/bai_large/flowers02.png'
	var texture	= THREE.ImageUtils.loadTexture(textureUrl)
	// build the material
	var material	= new THREE.MeshPhongMaterial({
		map		: texture,
		color		: 'grey',
		emissive	: 'darkgreen',
		alphaTest	: 0.7,
		// side		: THREE.DoubleSide,
	})
	// create the mesh
	var mesh	= new THREE.Mesh(mergedGeo, material)
	return mesh	
}

THREEx.createGrassTufts.baseUrl	= "../";
