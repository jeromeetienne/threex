function EmitterImpactBall(container){
	// load the texture
	var texture	= THREE.ImageUtils.loadTexture('../../threex.particles/examples/images/blue_particle.jpg')
	var updateFcts	= []
	this.emit	= function(position){
		// randomize the initial position
		position	= position.clone()
		position.x	+= (Math.random()-0.5)*0.3
		position.y	+= (Math.random()-0.5)*0.1
		position.z	+= (Math.random()-0.5)*0.3
		// init sprite material
		var material	= new THREE.SpriteMaterial({
			//color			: 0xAA4488,
			transparent		: true,
			blending		: THREE.AdditiveBlending,			map			: texture,
			useScreenCoordinates	: false,
			//color			: 0x666666
			color		: new THREE.Color().setHSL(Math.random(),1,0.5),
		})
		// init sprite
		var sprite	= new THREE.Sprite(material)
		sprite.rotation	= Math.random() * Math.PI*2
		sprite.position.copy(position)
		container.add(sprite)
		
		sprite.scale.set(1,1,1).multiplyScalar( 0.5 )

		var maxAge	= 1 + Math.random()*0.4
		// set velocity
		var velocity	= new THREE.Vector3(0, 0, 0)
		velocity.x	= (Math.random()-0.5)
		velocity.y	= (Math.random()-0.5)+0.5
		velocity.z	= (Math.random()-0.5)
		velocity.setLength(3 + (Math.random()-0.5)*0.5)
		// init opacity
		var age2Opacity	= createTweenMidi(maxAge, 0.05*maxAge, 0.4*maxAge)
		material.opacity= age2Opacity(0)
		
		var birthDate	= Date.now()/1000
		updateFcts.push(function callback(delta, now){
			var age	= Date.now()/1000 - birthDate
			if( age >= maxAge ){
				sprite.parent.remove(sprite)
				updateFcts.splice(updateFcts.indexOf(callback),1)
				return;	
			}
			// handle friction
			velocity.multiplyScalar( 0.97 )
			// move by velocity
			sprite.position.add( velocity.clone().multiplyScalar(delta) )
			// make it grow
			sprite.scale.multiplyScalar( 1.02 )
			// handle opacity
			material.opacity= age2Opacity(age)*0.5
		})
	}
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	function createTweenMidi(maxAge, attackTime, releaseTime){
		return function(age){
			if( age < attackTime ){
				return age / attackTime
			}else if( age < maxAge - releaseTime ){
				return 1;
			}else{
				return (maxAge - age) / releaseTime
			}
		}	
	}
}
