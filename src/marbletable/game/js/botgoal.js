var BotGoal	= function(){
	var texture	= cache.getSet('texture.botball', function(){
		var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg')
		return texture
	})
	// handle updateFcts for sounds
	var updateFcts	= []
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}

	var geometry	= new THREE.CubeGeometry(1*GAME.tileW, 3*GAME.tileW, 10*GAME.tileW)
	var material	= new THREE.MeshPhongMaterial({
		map		: texture,
		bumpMap		: texture,
		bumpScale	: 0.05
	})
	var object3d	= new THREE.Mesh(geometry, material)
	object3d.receiveShadow	= true
	object3d.castShadow	= true
	object3d.name	= (object3d.name || ' ') + 'goal ';

	this.object3d	= object3d
	scene.add( object3d )

	object3d.useQuaternion	= true

	var bodyx	= new THREEx.CannonBody({
		mesh	: object3d,
		mass	: 0,
	}).addTo(physicsWorld)
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})
}
