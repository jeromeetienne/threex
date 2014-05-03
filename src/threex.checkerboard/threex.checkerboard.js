var THREEx	= THREEx	|| {}

THREEx.CheckerBoard	= function(width, height, segmentsW, segmentsH, materialEven, materialOdd){
	console.assert(width !== undefined)
	console.assert(height !== undefined)
	segmentsW	= segmentsW !== undefined ? segmentsW : 8
	segmentsH	= segmentsH !== undefined ? segmentsH : 8
	materialEven	= materialEven !== undefined ? materialEven : new THREE.MeshBasicMaterial({ color: 0xffffff })
	materialOdd	= materialOdd !== undefined ? materialOdd : new THREE.MeshBasicMaterial({ color: 0x000000 })

	// create the geometry	
	var geometry		= new THREE.PlaneGeometry( width, height, segmentsW, segmentsH );
	// set materials per faces
	geometry.faces.forEach(function(face, idx){
		var y	= Math.floor(idx / segmentsW);
		var x	= idx - (y*segmentsW);
		face.materialIndex	= (y % 2 + x%2 ) %2;
	});
	// create the mesh
	var material	= new THREE.MeshFaceMaterial([materialEven, materialOdd]);
	var mesh	= new THREE.Mesh(geometry, material);
	mesh.rotation.x	= -Math.PI/2;
	return mesh
}