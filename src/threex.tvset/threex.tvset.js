var THREEx	= THREEx	|| {}

THREEx.TvSet	= function(onLoad){
	var object3d	= new THREE.Object3D
	this.object3d	= object3d

	// load the model
	var loader	= new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	var baseUrl	= THREEx.TvSet.baseUrl;
	var modelUrl	= baseUrl + 'models/OldTelevisionSet01/models/Old Television Set 01.dae'
	loader.load(modelUrl, function(collada){
		var model	= collada.scene;
		this.model	= model
		object3d.add(model)

		model.position.y	= -0.4
		
		onLoad	&& onLoad()
	}.bind(this))

	/**
	 * create and set a screen plane
	 */
	this.createScreenPlane	= function(){
		var geometry	= new THREE.PlaneGeometry(1,1)
		var material	= new THREE.MeshBasicMaterial()
		var mesh	= new THREE.Mesh(geometry, material)
		return this.setScreenPlane(mesh)
	}

	/**
	 * set a screen plane
	 */
	this.setScreenPlane	= function(screenPlane){
		this.screenPlane= screenPlane
		
		screenPlane.position.set(0.0, 0.31, 0.16)
		// screenPlane.scale.set(1/2.2, 1/2.85, 1)
		
		object3d.add(screenPlane)
		
		return screenPlane
	}
}

THREEx.TvSet.baseUrl	= "../";
