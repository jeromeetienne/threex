var JuiceIntensityBall	= function(){
	// for update loop
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	var container	= new THREE.Object3D
	container.rotation.x	= Math.PI/2
	this.object3d		= container

	
	var radius	= 2 * GAME.tileW

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var material	= new THREE.MeshPhongMaterial({
		color		: new THREE.Color().setHSL(Math.random(),1,0.5),
		transparent	: true,
		blending	: THREE.AdditiveBlending,
	})
	var geometry	= new THREE.TorusGeometry(radius-0.2*GAME.tileW, 0.2*GAME.tileW, 32, 16)

	// ring 1	
	var ring1	= new THREE.Mesh(geometry, material)
	container.add(ring1)
	updateFcts.push(function(delta, now){
		ring1.rotation.x += 1 * delta;
	})
	// ring 2
	var ring2	= new THREE.Mesh(geometry, material)
	ring1.add(ring2)
	updateFcts.push(function(delta, now){
		ring2.rotation.y += 1 * delta;
	})
	// ring 3
	var ring3	= new THREE.Mesh(geometry, material)
	ring2.add(ring3)
	updateFcts.push(function(delta, now){
		ring3.rotation.x += 1 * delta;
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	

	var intensity	= 0.6
	this.intensity	= function(value){
		if( value === undefined )	return intensity
		intensity	= value;
		intensity	= Math.min(intensity, 1)
		return intensity;
	}
	updateFcts.push(function(delta, now){
		material.opacity	= intensity
	})
		
	// change hue with perlin
	var perlin 	= new ImprovedNoise();	
	updateFcts.push(function(delta, now){		
		var hue		= perlin.noise(0.4*now, 0, 0) + 0.5
		material.color.setHSL(hue, 1, 0.5)
	});
}