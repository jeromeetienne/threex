var THREEx	= THREEx || {}

THREEx.GeometricGlowMesh	= function(mesh){
	var object3d	= new THREE.Object3D

	var geometry	= mesh.geometry.clone()
	THREEx.dilateGeometry(geometry, 0.01)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value	= new THREE.Color('cyan')
	material.uniforms.coeficient.value	= 1.1
	material.uniforms.power.value		= 0.7
	// material.side	= THREE.DoubleSide
	var insideMesh	= new THREE.Mesh(geometry, material );
	object3d.add( insideMesh );

	// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)	

	var geometry	= mesh.geometry.clone()
	THREEx.dilateGeometry(geometry, 0.1)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value	= new THREE.Color('cyan')
	material.uniforms.coeficient.value	= 0.2
	material.uniforms.power.value		= 2.0
	material.side	= THREE.BackSide
	var outsideMesh	= new THREE.Mesh( geometry, material );
	outsideMesh.scale.multiplyScalar(1.2)
	object3d.add( outsideMesh );

	this.object3d	= object3d
	this.insideMesh	= insideMesh
	this.outsideMesh= outsideMesh
}
