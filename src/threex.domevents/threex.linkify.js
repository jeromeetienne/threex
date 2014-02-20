var THREEx	= THREEx	|| {}


THREEx.linkify	= function(domEvents, mesh, url){
	// compute geometry size
	var geometry	= mesh.geometry
	geometry.computeBoundingBox();
	var size	= new THREE.Vector3();
	size.x	= (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
	size.y	= (geometry.boundingBox.max.y - geometry.boundingBox.min.y)
	size.z	= (geometry.boundingBox.max.z - geometry.boundingBox.min.z)

	// build the underline
	var underlineH	= size.y / 10;
	var deltaY	= size.y / 20;
	var underline	= new THREE.Mesh(new THREE.CubeGeometry(size.x, underlineH, size.z), new THREE.MeshNormalMaterial())
	underline.position.y	+= -size.y/2 - deltaY - underlineH/2

	// make it invisible by default
	// underline.visible	= false;

	// add it to the mesh
	mesh.add(underline)

	// bind the click
	domEvents.bind(mesh, 'click', function(event){
		window.open(url, '_blank');
	});

	// bind 'mouseover'
	domEvents.bind(mesh, 'mouseover', function(event){
		underline.visible	= true;
		document.body.style.cursor	= 'pointer';
	}, false)
		
	// bind 'mouseout'
	domEvents.bind(mesh, 'mouseout', function(event){
		underline.visible	= false;		
		document.body.style.cursor	= 'default';
	}, false)
}