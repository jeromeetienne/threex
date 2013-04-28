/** @namespace */
var THREEx	= THREEx || {};

THREEx.build	= function(origin){
	if( origin instanceof THREE.Mesh ){
		return new THREEx.MeshBuilder(origin)
	}else if( origin instanceof THREE.Object3D ){
		return new THREEx.Object3DBuilder(origin)		
	}else {
		console.assert(false, 'origin type not handled : '+origin)
	}
};
