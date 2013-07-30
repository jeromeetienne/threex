var THREEx = THREEx || {}


THREEx.ThreePointsLighting	= function(){
	var object3d	= new THREE.Object3D()
	// add a ambient light
	var light	= new THREE.AmbientLight( 0x020202 )
	object3d.add( light )
	// add a light in front
	var light	= new THREE.DirectionalLight('white', 1)
	light.position.set(0.5, 0.5, 2)
	object3d.add( light )
	// add a light behind
	var light	= new THREE.DirectionalLight('white', 0.75)
	light.position.set(-0.5, -0.5, -2)
	object3d.add( light )
	
	return object3d
}

THREEx.SunSetLighting	= function(){
	var object3d	= new THREE.Object3D()
	var light	= new THREE.AmbientLight( 0x080808 )
	object3d.add( light )
	var light	= new THREE.DirectionalLight( 'midnightblue', 1 )
	light.position.set(5,1,0)
	object3d.add( light )
	var light	= new THREE.DirectionalLight( 'darkred', 1.5 )
	object3d.add( light )
	return object3d
}