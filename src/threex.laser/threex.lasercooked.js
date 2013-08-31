var THREEx = THREEx || {}

THREEx.LaserCooked	= function(container){
	// for update loop
	var updateFcts	= []
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)	
		})
	}

	// build THREE.Sprite for impact
	var textureUrl	= THREEx.LaserCooked.baseURL+'images/blue_particle.jpg';
	var texture	= THREE.ImageUtils.loadTexture(textureUrl)	
	var material	= new THREE.SpriteMaterial({
		map			: texture,
		blending		: THREE.AdditiveBlending,
		useScreenCoordinates	: false,
	})
	var sprite	= new THREE.Sprite(material)
	sprite.scale.set(1, 1, 1).multiplyScalar(2)
	sprite.position.x	= 1
	container.add(sprite)

	// add a point light
	var light	= new THREE.PointLight( 0x4444ff, 10 );
	light.intensity	= 2
	light.distance	= 4
	light.position.x= -0.05
	this.light	= light
	sprite.add(light)
	
	var raycaster	= new THREE.Raycaster();
	// TODO assume container.position are worldPosition. works IFF attached to scene
	raycaster.ray.origin.copy(container.position)
	updateFcts.push(function(delta, now){
		// get container matrixWorld
		container.updateMatrixWorld();
		var matrixWorld	= container.matrixWorld.clone()
		// set the origin
		raycaster.ray.origin.getPositionFromMatrix(matrixWorld)
		// keep only the roation
		matrixWorld.setPosition(new THREE.Vector3(0,0,0))		
		// set the direction
		raycaster.ray.direction.set(1,0,0)
			.applyMatrix4( matrixWorld )
			.normalize()


		var intersects	= raycaster.intersectObjects( scene.children );
		if( intersects.length > 0 ){
			var position	= intersects[0].point
			var distance	= position.distanceTo(container.position)
			container.scale.x	= distance
		}else{
			container.scale.x	= 10			
		}
	});
}

THREEx.LaserCooked.baseURL	= '../'
