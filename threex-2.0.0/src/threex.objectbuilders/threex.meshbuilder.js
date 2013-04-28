/** @namespace */
var THREEx	= THREEx || {};

THREEx.MeshBuilder	= function(mesh){
	console.assert(mesh instanceof THREE.Mesh)

	THREEx.Object3DBuilder.apply(this, arguments)
}

THREEx.MeshBuilder.prototype = Object.create( THREEx.Object3DBuilder.prototype );

THREEx.createMesh	= function(mesh){
	return new THREEx.MeshBuilder(mesh)
}