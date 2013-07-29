
function LightingDefault(){
	var object3d	= new THREE.Object3D()
	this.object3d	= object3d

	var light	= new THREE.AmbientLight( 0x444444 )
	object3d.add( light )

	var light	= new THREE.DirectionalLight( 'white', 1 )
	light.position.set(5,5,5)
	light.target.position.set( 0, 1, 0 )
	object3d.add( light )

	light.castShadow	= true
	light.shadowCameraNear	= 0.01
	light.shadowCameraFar	= 15
	light.shadowCameraFov	= 45

	light.shadowCameraLeft	= -8
	light.shadowCameraRight	=  8
	light.shadowCameraTop	=  5
	light.shadowCameraBottom= -5

	//light.shadowCameraVisible = true

	light.shadowBias	= 0.001
	light.shadowDarkness	= 0.5

	light.shadowMapWidth	= 1024*2
	light.shadowMapHeight	= 1024*2
}

