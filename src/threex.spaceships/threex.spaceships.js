var THREEx	= THREEx	|| {}

THREEx.SpaceShips		= {}

THREEx.SpaceShips.baseUrl	= '../'

THREEx.SpaceShips.loadSpaceFighter01	= function(onLoad){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		var object3d	= event.content
		object3d.scale.multiplyScalar(1/300)
		// change emissive color of all object3d material - they are too dark
		object3d.traverse(function(object3d){
			if( object3d.material ){
				object3d.material.emissive.set('white')
			}
		})
		// notify the callback
		onLoad	&& onLoad(object3d)
	});
	var baseUrl	= THREEx.SpaceShips.baseUrl 
	var objUrl	= baseUrl + 'models/SpaceFighter01/SpaceFighter01.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter01/SpaceFighter01.mtl';
	loader.load(objUrl, mtlUrl);		
}

THREEx.SpaceShips.loadSpaceFighter02	= function(onLoad){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		var object3d	= event.content
		object3d.scale.multiplyScalar(1/200)
		// change emissive color of all object3d material - they are too dark
		object3d.traverse(function(object3d){
			if( object3d.material ){
				object3d.material.emissive.set('white')
			}
		})
		// notify the callback
		onLoad	&& onLoad(object3d)
	});
	var baseUrl	= THREEx.SpaceShips.baseUrl 
	var objUrl	= baseUrl + 'models/SpaceFighter02/SpaceFighter02.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter02/SpaceFighter02.mtl';
	loader.load(objUrl, mtlUrl);		
}

THREEx.SpaceShips.loadSpaceFighter03	= function(onLoad){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		var object3d	= event.content
		object3d.scale.multiplyScalar(1/10)
		// change emissive color of all object3d material - they are too dark
		object3d.traverse(function(object3d){
			if( object3d.material ){
				object3d.material.emissive.set('white')
			}
		})
		// notify the callback
		onLoad	&& onLoad(object3d)
	});
	var baseUrl	= THREEx.SpaceShips.baseUrl 
	var objUrl	= baseUrl + 'models/SpaceFighter03/SpaceFighter03.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter03/SpaceFighter03.mtl';
	loader.load(objUrl, mtlUrl);		
}

THREEx.SpaceShips.loadShuttle01	= function(onLoad){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		var object3d	= event.content
		object3d.scale.multiplyScalar(1/400)
		// change emissive color of all object3d material - they are too dark
		object3d.traverse(function(object3d){
			if( object3d.material ){
				object3d.material.emissive.set('white')
			}
		})
		// notify the callback
		onLoad	&& onLoad(object3d)
	});
	var baseUrl	= THREEx.SpaceShips.baseUrl 
	var objUrl	= baseUrl + 'models/Shuttle01/Shuttle01.obj';
	var mtlUrl	= baseUrl + 'models/Shuttle01/Shuttle01.mtl';
	loader.load(objUrl, mtlUrl);		
}

THREEx.SpaceShips.loadShuttle02	= function(onLoad){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		var object3d	= event.content
		object3d.scale.multiplyScalar(1/400)
		// change emissive color of all object3d material - they are too dark
		object3d.traverse(function(object3d){
			if( object3d.material ){
				object3d.material.emissive.set('white')
			}
		})
		// notify the callback
		onLoad	&& onLoad(object3d)
	});
	var baseUrl	= THREEx.SpaceShips.baseUrl 
	var objUrl	= baseUrl + 'models/Shuttle02/Shuttle02.obj';
	var mtlUrl	= baseUrl + 'models/Shuttle02/Shuttle02.mtl';
	loader.load(objUrl, mtlUrl);		
}


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.SpaceShips.Shoot	= function(){
	// your code goes here
	var canvas	= generateShootCanvas();
	var texture	= new THREE.Texture( canvas );
	texture.needsUpdate = true;

	// do the material	
	var material	= new THREE.MeshBasicMaterial({
		color		: 0xffaacc,
		map		: texture,
		side		: THREE.DoubleSide,
		blending	: THREE.AdditiveBlending,
		depthWrite	: false,
		transparent	: true
	})

	var container	= new THREE.Object3D
	container.rotateY(Math.PI/2)
	container.scale.multiplyScalar(1/2)
	var nPlanes	= 4;
	for(var i = 0; i < nPlanes; i++){
		var geometry	= new THREE.PlaneGeometry(1,1)
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.material	= material
		mesh.rotateX(i*Math.PI/nPlanes)
		container.add(mesh)
	}
	
	return container	
		
	function generateShootCanvas(){
		// init canvas
		var canvas	= document.createElement( 'canvas' );
		var context	= canvas.getContext( '2d' );
		canvas.width	= 16;
		canvas.height	= 64;
		// set gradient
		var gradient	= context.createRadialGradient(
			canvas.width/2, canvas.height /2, 0,
			canvas.width/2, canvas.height /2, canvas.width /2
		);		
		gradient.addColorStop( 0  , 'rgba(255,255,255,1)' );
		gradient.addColorStop( 0.5, 'rgba(192,192,192,1)' );
		gradient.addColorStop( 0.8, 'rgba(128,128,128,0.7)' );
		gradient.addColorStop( 1  , 'rgba(0,0,0,0)' );

		// fill the rectangle
		context.fillStyle	= gradient;
		context.fillRect(0,0, canvas.width, canvas.height);
		// return the just built canvas 
		return canvas;	
	};
}

/**
 * create a detonation effect. 
 */
THREEx.SpaceShips.Detonation	= function(){
	var baseUrl	= THREEx.SpaceShips.baseUrl 
	var url		= baseUrl + 'images/lensflare0_alpha.png';
	var texture	= THREE.ImageUtils.loadTexture(url);
	// do the material	
	var geometry	= new THREE.PlaneGeometry(1,1)
	var material	= new THREE.MeshBasicMaterial({
		color		: 0x00ffff,
		map		: texture,
		side		: THREE.DoubleSide,
		blending	: THREE.AdditiveBlending,
		opacity		: 2,
		depthWrite	: false,
		transparent	: true
	})
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.scale.multiplyScalar(0.75)
	return mesh;
}
