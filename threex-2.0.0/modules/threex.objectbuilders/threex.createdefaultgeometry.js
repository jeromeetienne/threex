/** @namespace */
var THREEx	= THREEx || {};

// ugly trick to get .apply() to work for new
// TODO put that elsewhere
THREEx.CreatorsApplyForNew	= function(ctor, args){
	return function(a0, a1, a2, a3, a4, a5, a6, a7){
		console.assert(args.length <= 9);
		return new ctor(a0,a1,a2,a3,a4,a5,a6,a7);
	}.apply(null, args)
}

THREEx.createCube	= function(){
	var args	= arguments.length > 0 ? arguments : [1,1,1]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.CubeGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}

THREEx.createTorus	= function(){
	var args	= arguments.length > 0 ? arguments : [0.5-0.15, 0.15]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.TorusGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}

THREEx.createTorusKnot	= function(){
	var args	= arguments.length > 0 ? arguments : [0.27, 0.1, 128, 32]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.TorusKnotGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}

THREEx.createCircle	= function(){
	var args	= arguments.length > 0 ? arguments : [0.5, 32]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.CircleGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}

THREEx.createSphere	= function(){
	var args	= arguments.length > 0 ? arguments : [0.5, 32, 16]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.SphereGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}


THREEx.createPlane	= function(){
	var args	= arguments.length > 0 ? arguments : [1, 1, 16, 16]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.PlaneGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}

THREEx.createCylinder	= function(){
	var args	= arguments.length > 0 ? arguments : [0.5, 0.5, 1, 16, 4]
	var geometry	= THREEx.CreatorsApplyForNew(THREE.CylinderGeometry, args)
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	return THREEx.createMesh(mesh);
}

