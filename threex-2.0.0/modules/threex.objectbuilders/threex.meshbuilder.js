/** @namespace */
var THREEx	= THREEx || {};

THREEx.MeshBuilder	= function(mesh){
	console.assert(mesh instanceof THREE.Mesh)
	
	THREEx.Object3DBuilder.apply(this, arguments)
	
	this.mesh	= this.object3D
}

THREEx.MeshBuilder.prototype = Object.create( THREEx.Object3DBuilder.prototype );
