
function initLighting(renderer, scene){
	renderer.shadowMapEnabled	= true
	//renderer.shadowMapType	= THREE.PCFSoftShadowMap


	var light	= new THREE.AmbientLight( 0x444444 )
	scene.add( light )

	var light	= new THREE.DirectionalLight( 0xcccccc, 1 )
	scene.add( light )

	light.position.set(5,5,5)
	light.target.position.set( 0, 0, 0 )

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

	light.shadowMapWidth	= 1024
	light.shadowMapHeight	= 1024

	scene.add( light )
	
}

