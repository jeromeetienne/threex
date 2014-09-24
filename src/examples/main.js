	var renderer	= new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var scene	= new THREE.Scene();
	var loop	= new THREEx.Loop().start();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 3;
	
	var geometry	= new THREE.TorusGeometry( 0.35, 0.15 );
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	scene.add( mesh );
	mesh.position.y	= -0.5;
	mesh.rotation.x	= Math.PI/2;

	
	new BlackSmoke(mesh.position, loop, scene)

	loop.hook(function(delta, now){
		renderer.render( scene, camera );
	})

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////
	
function BlackSmoke(position, loop, container){
	var texture	= THREE.ImageUtils.loadTexture('../src/threex.particles/examples/images/newcloud.png')
	var center	= new THREE.Vector3(0,-0.8, 0)
	var maxAge	= 1.5;
	var age2Friction= (function(){
		var gradient	= createLinearGradient([
			{x : 0.00, y: 1.00}, {x : 0.50, y: 1.00},
			{x : 0.70, y: 0.90}, {x : 1.00, y: 0.90}
		]);
		return function(age, maxAge){
			return gradient(age/maxAge)
		}
	})();
	var age2Opacity	= createTweenMidi(maxAge, 0.05*maxAge, 0.4*maxAge);
	var lastEmit	= 0;
	loop.hook(function(delta, now){
		// rate limiter emition
		var rate = 5;
		if( rate === 0 || now - lastEmit < 1/rate )	return;
		lastEmit	= now;

		// init sprite material
		var material	= new THREE.SpriteMaterial({
			map			: texture,
			useScreenCoordinates	: false,
		})
		// init sprite
		var sprite	= new THREE.Sprite(material)
		sprite.position.copy(position)
		sprite.position.x	+= (Math.random()-0.5)*0.1
		sprite.position.y	+= (Math.random()-0.5)*0.0001
		sprite.position.z	+= (Math.random()-0.5)*0.1
		container.add(sprite)
		// set velocity
		var velocity	= new THREE.Vector3(0, 1, 0)
		velocity.x	+= (Math.random()-0.5)*0.3;
		velocity.y	+= (Math.random()-0.5)*0.1;
		velocity.z	+= (Math.random()-0.5)*0.3;
		velocity.setLength(1.15 + (Math.random()-0.5)*0.3)
		// init patterm
		material.color.setHex( 0x010101*Math.floor(255*(Math.random()*0.1+0.3)) );
		sprite.scale.set(1,1,1).multiplyScalar(0.8 + Math.random()*0.2)
		sprite.rotation	= Math.random() * Math.PI*2
		material.opacity= age2Opacity(0)
		
		var birthDate	= now;
		var callback	= loop.hook(function(delta, now){
			var age	= now - birthDate;
			if( age >= maxAge ){
				sprite.parent.remove(sprite)
				loop.unhook(callback)
				return;	
			}
			// handle friction
			velocity.multiplyScalar( age2Friction(age, maxAge) )
			// move by velocity
			sprite.position.add( velocity.clone().multiplyScalar(delta) )
			// make it grow
			sprite.scale.multiplyScalar( 1.005 )
			material.opacity	= age2Opacity(age)

			material.color.setHSL( (age/maxAge) * 0.22 + 0.90, 1, 0.5 );
		})
	})

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
	function createLinearGradient(keyPoints){
		return function(x){
			// find the keyPoints 
			for( var i = 0; i < keyPoints.length; i++ ){
				if( x <= keyPoints[i].x )	break;
			}
			if( i === 0 )	return keyPoints[0].y;
			// sanity check
			console.assert(i < keyPoints.length );
			// compute the y
			var previous	= keyPoints[i-1];
			var next	= keyPoints[i];
			var ratio	= (x - previous.x) / (next.x - previous.x)
			var y		= previous.y + ratio * (next.y - previous.y)
			// return y
			return y;
		}
	}
}