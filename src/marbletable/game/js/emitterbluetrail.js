function EmitterBlueTrail(container){
	var texture	= THREE.ImageUtils.loadTexture('../../threex.particles/examples/images/blue_particle.jpg')
	var maxAge	= 1;
	var tweenOpacity= createTweenMidi(maxAge, 0.33*maxAge, 0.33*maxAge);
	var tweenScale	= (function(){
		var tweenMidi	= createTweenMidi(maxAge, 0.2*maxAge, 0.2*maxAge);
		return function(age){
			return (1 + 1 * tweenMidi(age)) * 0.3
		}
	})();
	var updateFcts	= []
	var prevPosition= null;
	this.emit	= function(position){
		// init sprite material
		var material	= new THREE.SpriteMaterial({
			map			: texture,
			useScreenCoordinates	: false,
			color			: 0xAA4488,
			transparent		: true,
			blending		: THREE.AdditiveBlending
		})
		// init sprite
		var sprite	= new THREE.Sprite(material)
		//sprite.rotation	= Math.random() * Math.PI*2
		sprite.position.copy( position )
		container.add( sprite )

		// compute velocity
		prevPosition	= prevPosition || position.clone();
		var velocity	= position.clone().sub(prevPosition).normalize();
		prevPosition.copy( position )

		// start a little bit behind the container
		sprite.position.add( velocity.clone().multiplyScalar(-0.1) )

		// init pattern
		sprite.scale.set(1,1,1).multiplyScalar( tweenScale(0) )
		material.opacity= tweenOpacity(0)

		var birthDate	= Date.now()/1000;
		updateFcts.push(function callback(delta, now){
			var age	= Date.now()/1000 - birthDate;
			if( age >= maxAge ){
				sprite.parent.remove(sprite)
				updateFcts.splice(updateFcts.indexOf(callback),1)
				return;	
			}
			sprite.scale.set(1,1,1).multiplyScalar( tweenScale(age) )
			material.opacity= tweenOpacity(age)
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
