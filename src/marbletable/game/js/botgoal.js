var BotGoal	= function(){
	var texture	= THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg')
	//var texture	= THREE.ImageUtils.loadTexture('images/wood.jpg')
	//var texture	= THREE.ImageUtils.loadTexture('images/water.jpg')
	var texture	= THREE.ImageUtils.loadTexture('images/checkerboard.jpg')

	// handle updateFcts for sounds
	var updateFcts	= []
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}


	var geometry	= new THREE.CubeGeometry(3*GAME.tileW, 3*GAME.tileW, 30*GAME.tileW)
	var material	= new THREE.MeshPhongMaterial({
		map		: texture
	})

	material.map.wrapS	= THREE.RepeatWrapping;
	material.map.wrapT	= THREE.RepeatWrapping;
	// adapt the UVs to the cube size - to avoid to strech the texture 
	var faceVertexUvs	= geometry.faceVertexUvs[0];
	faceVertexUvs[0].forEach(function(vector){ vector.x *= geometry.depth;	})
	faceVertexUvs[0].forEach(function(vector){ vector.y *= geometry.width;	})
	faceVertexUvs[1].forEach(function(vector){ vector.x *= geometry.depth;	})
	faceVertexUvs[1].forEach(function(vector){ vector.y *= geometry.width;	})
	faceVertexUvs[2].forEach(function(vector){ vector.x *= geometry.width;	})
	faceVertexUvs[2].forEach(function(vector){ vector.y *= geometry.depth;	})
	// faceVertexUvs[4].forEach(function(vector){ vector.x *= geometry.width;	})
	// faceVertexUvs[5].forEach(function(vector){ vector.x *= geometry.width;	})


	var object3d	= new THREE.Mesh(geometry, material)
	object3d.receiveShadow	= true
	object3d.castShadow	= true
	object3d.name	= (object3d.name || ' ') + 'goal ';

	this.object3d	= object3d
	scene.add( object3d )

	var bodyx	= new THREEx.CannonBody({
		mesh	: object3d,
		mass	: 0,
	}).addTo(physicsWorld)
	updateFcts.push(function(delta, now){
		bodyx.update(delta, now)
	})
}
