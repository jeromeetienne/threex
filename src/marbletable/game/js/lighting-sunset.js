function LightingSunset(){
	var object3d	= new THREE.Object3D()
	this.object3d	= object3d
	
	var light	= new THREE.AmbientLight( 0x444444 )
	object3d.add( light )

	var light	= new THREE.DirectionalLight( 'midnightblue', 1 )
	light.position.set(5,2,0)
	light.target.position.set( 0, 1, 0 )
	object3d.add( light )

	var light	= new THREE.DirectionalLight( 'darkred', 2 )
	object3d.add( light )

	light.position.set(-4,2,0).setLength(10)
	light.target.position.set( 0, 0, 0 )
	light.angle	= Math.PI / 3;
	light.exponent	= 10;
	
	light.castShadow	= true
	light.shadowCameraNear	= 0.01
	light.shadowCameraFar	= 25
	light.shadowCameraFov	= 45

	light.shadowCameraLeft	= -8
	light.shadowCameraRight	=  8
	light.shadowCameraTop	=  5
	light.shadowCameraBottom= -5

	//light.shadowCameraVisible = true

	light.shadowBias	= 0.00
	light.shadowDarkness	= 0.25

	light.shadowMapWidth	= 1024*2
	light.shadowMapHeight	= 1024*2

	return;
}

