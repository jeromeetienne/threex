function EmitterScore(container){
	// load the texture
	var updateFcts	= []
	this.emit	= function(position, text){
		// build the texture
		var texture	= cache.getSet('texture.emitterScore_'+text, function(){
			var canvas	= buildCanvas(text)
			var texture	= new THREE.Texture(canvas);
			texture.needsUpdate	= true;
			return texture
		})
		// randomize the initial position
		position	= position.clone()
		// init sprite material
		var material	= new THREE.SpriteMaterial({
			map			: texture,
			useScreenCoordinates	: false,
		})
		// init sprite
		var sprite	= new THREE.Sprite(material)
		sprite.position.copy(position)
		container.add(sprite)
		
		sprite.scale.set(1,1,1).multiplyScalar( 6 )

		var maxAge	= 2
		// set velocity
		var velocity	= new THREE.Vector3(0, 3, 0)
		velocity.x	+= (Math.random()-0.5)*2
		velocity.z	+= (Math.random()-0.5)*2
		// init opacity
		var age2Opacity	= createTweenMidi(maxAge, 0.1*maxAge, 0.2*maxAge)
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
			// handle opacity
			material.opacity= age2Opacity(age)*0.8
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
	/**
	 * Build a canvas for the nickname cartouche
	 */
	function buildCanvas(text){
		// create the canvas
		var canvas	= document.createElement('canvas');
		var context	= canvas.getContext('2d');
		canvas.width	= 256;
		canvas.height	= 256;
		// center the origin
		context.translate( canvas.width/2, canvas.height/2 );
		// measure text
		var fontSize	= 36;
		context.font	= 'bolder '+fontSize+'px Verdana';
		var fontH	= fontSize;
		var fontW	= context.measureText(text).width;
		// display the text
		context.fillStyle	= 'rgba(255,0,0,255)';
		context.fillStyle	= 'hsla('+(Math.random()*360)+', 100%, 50%, 1)';
		context.fillText(text, -fontW/2, 0);
		// return the canvas element
		return canvas;
	}
}
