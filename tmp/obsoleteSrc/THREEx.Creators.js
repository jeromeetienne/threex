var THREEx	= THREEx || {};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Creators	= {}
THREEx.Creators._defaultMaterial= new THREE.MeshNormalMaterial();
THREEx.Creators._creatoraMesh	= function(ctor, dflGeometry, args){
	// convert args to array if it is instanceof Arguments
	// FIXME if( args instanceof Arguments )
	args	= Array.prototype.slice.call( args );
	
	// init the material
	var material	= THREEx.Creators._defaultMaterial;
	// if the last arguments is a material, use it
	if( args.length && args[args.length-1] instanceof THREE.Material ){
		material	= args.pop();
	}else if( args.length && args[args.length-1] instanceof tQuery.Material ){
		material	= args.pop().get(0);
	}
	
	// ugly trick to get .apply() to work 
	var createFn	= function(ctor, a0, a1, a2, a3, a4, a5, a6, a7){
		console.assert(arguments.length <= 9);
		//console.log("createFn", arguments)
		return new ctor(a0,a1,a2,a3,a4,a5,a6,a7);
	}
	if( args.length === 0 )	args	= dflGeometry.slice();
	args.unshift(ctor);
	var geometry	= createFn.apply(this, args);

	// set the geometry.dynamic by default
	geometry.dynamic= true;
	// create the THREE.Mesh
	if( THREEx.Mesh )	var mesh = new THREEx.Mesh(geometry, material)
	else			var mesh = new THREE.Mesh(geometry, material)
	// return it
	return mesh;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.createCubeMesh	= function(){
	var ctor	= THREE.CubeGeometry;
	var dflGeometry	= [1, 1, 1];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
}

THREEx.createTorusMesh	= function(){
	var ctor	= THREE.TorusGeometry;
	var dflGeometry	= [0.5-0.15, 0.15];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
};

THREEx.createTorusKnotMesh	= function(){
	var ctor	= THREE.TorusKnotGeometry;
	var dflGeometry	= [0.27, 0.1, 128, 32];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
};

THREEx.createCircleMesh	= function(){
	var ctor	= THREE.CircleGeometry;
	var dflGeometry	= [0.5, 32];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
};

THREEx.createSphereMesh	= function(){
	var ctor	= THREE.SphereGeometry;
	var dflGeometry	= [0.5, 32, 16];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
};

THREEx.createPlaneMesh	= function(){
	var ctor	= THREE.PlaneGeometry;
	var dflGeometry	= [1, 1, 16, 16];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
};

THREEx.createCylinderMesh	= function(){
	var ctor	= THREE.CylinderGeometry;
	var dflGeometry	= [0.5, 0.5, 1, 16, 4];
	return THREEx.Creators._creatoraMesh(ctor, dflGeometry, arguments)
};

