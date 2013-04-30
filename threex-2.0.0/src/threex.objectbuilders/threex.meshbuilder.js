/** @namespace */
var THREEx	= THREEx || {};

THREEx.MeshBuilder	= function(mesh){
	console.assert(mesh instanceof THREE.Mesh)

	THREEx.Object3DBuilder.apply(this, arguments)
	
	this.mesh	= this.content;
}

THREEx.MeshBuilder.prototype = Object.create( THREEx.Object3DBuilder.prototype );

THREEx.createMesh	= function(mesh){
	return new THREEx.MeshBuilder(mesh)
}

THREEx.MeshBuilder.prototype.geometry	= function(){
	var builder = new THREEx.GeometryBuilder(this.mesh.geometry).back(this)
	return builder
}

THREEx.MeshBuilder.prototype.material	= function(){
	var builder = new THREEx.MaterialBuilder(this.mesh.material).back(this)
	return builder
}