function EmitterSpeedTrail(container){
	// load the texture
	var texture	= THREE.ImageUtils.loadTexture('../../threex.particles/examples/images/cloud10.png')
	var updateFcts	= []
	this.emit	= function(position){
		// init sprite material
		var material	= new THREE.SpriteMaterial({
			map			: texture,
			useScreenCoordinates	: false,
			color			: 'purple'
		})
		// init sprite
		var sprite	= new THREE.Sprite(material)
		sprite.rotation	= Math.random() * Math.PI*2
		sprite.position.copy(position)
		container.add(sprite)
		
		sprite.scale.set(1,1,1).multiplyScalar( 0.5 )

		var maxAge	= 1 + Math.random()*0.4
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
			// handle opacity
			material.opacity= age2Opacity(age)*0.5
		})
	}
	var lastEmit	= 0;
	this.emitThrottle= function(position, rate){
		// rate limiter emition
		var now	= Date.now()/1000
		if( rate === 0 || now - lastEmit < 1/rate )	return;
		lastEmit	= now;
		// emit now
		this.emit(position)
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
