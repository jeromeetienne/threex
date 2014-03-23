var THREEx	= THREEx || {}

/**
 * Plugins for sport car
*/
THREEx.SportCar	= function(opts){

// TODO port to threex
if( false ){
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		type	: "veyron",
		scale	: 1.5,
		world	: tQuery.world 
	});	
}

	this._opts	= {
		type	: "veyron",
		scale	: 1.5,
	}
	// this._opts	= {
	// 	type	: "gallardo",
	// 	scale	: 1.0,
	// }
	this._opts.scale	/= 400;

	console.assert( ["gallardo", "veyron"].indexOf(this._opts.type) !== -1 );


	var car		= new THREE.Car();
	this.object3d	= car.root
	this._car	= car;
	car.modelScale	= this._opts.scale;
	
	car.backWheelOffset	= {
		"gallardo"	: 25 * car.modelScale,
		"veyron"	:  0 * car.modelScale
	}[this._opts.type];
	car.MAX_SPEED		*= car.modelScale;
	car.MAX_REVERSE_SPEED	*= car.modelScale;
	car.FRONT_ACCELERATION	*= car.modelScale;
	car.BACK_ACCELERATION	*= car.modelScale;
	car.FRONT_DECCELERATION	*= car.modelScale;
	car.STEERING_RADIUS_RATIO/= car.modelScale;

	car.callback	= function( object ){
		object.root.position.y	= {
			"gallardo"	: 0.13,
			"veyron"	: 0
		}[this._opts.type]

		// this._setNormalMaterial();
		this._setNiceMaterial();

		this._addFlare();

		this._car.enableShadows(true);

		this.dispatchEvent('load');
	}.bind(this);

	// determine urls
	var baseUrl	= THREEx.SportCar.baseUrl;
	if( this._opts.type === "gallardo" ){
		var bodyUrl	= baseUrl + 'obj/gallardo/parts/gallardo_body_bin.js'
		var wheelUrl	= baseUrl + 'obj/gallardo/parts/gallardo_wheel_bin.js'
	}else if( this._opts.type === "veyron" ){
		var bodyUrl	= baseUrl + 'obj/veyron/parts/veyron_body_bin.js'
		var wheelUrl	= baseUrl + 'obj/veyron/parts/veyron_wheel_bin.js'
	}else	console.assert(false);
	// start loading
	car.loadPartsBinary(bodyUrl, wheelUrl);	

	// the controls of the car
	this.inputs	= {
		moveForward	: false,
		moveBackward	: false,
		moveLeft	: false,
		moveRight	: false
	};

	// hook the rendering loop and update the car model
	this.update	= function(delta){
		this._car.updateCarModel(delta, this.inputs);
	}.bind(this);

	// to contains the flares sprite
	this._flareSprites	= {}
}

THREEx.SportCar.baseUrl	= "../";


//////////////////////////////////////////////////////////////////////////////////
//		microevent.js							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * microevents.js - https://github.com/jeromeetienne/microevent.js
*/
;(function(destObj){
	destObj.addEventListener	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		return fct;
	};
	destObj.removeEventListener	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	destObj.dispatchEvent	= function(event /* , args... */){
		if(this._events === undefined) 	this._events	= {};
		if( this._events[event] === undefined )	return;
		var tmpArray	= this._events[event].slice(); 
		for(var i = 0; i < tmpArray.length; i++){
			var result	= tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
			if( result !== undefined )	return result;
		}
		return undefined;
	};
})(THREEx.SportCar.prototype)

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.SportCar.prototype.flareVisible	= function(categories, value){
	var flareCategories	= ['frontA', 'frontB', 'backA', 'backB'];
	categories.forEach(function(category){
		console.assert( flareCategories.indexOf(category) !== -1 );
		var flares	= this._flareSprites[category];
		if( !flares )	return;
		flares.forEach(function(sprite){
			sprite.visible	= value;
		})
	}.bind(this))
};

THREEx.SportCar.prototype.flareOpacity	= function(categories, value){
	var flareCategories	= ['frontA', 'frontB', 'backA', 'backB'];
	categories.forEach(function(category){
		console.assert( flareCategories.indexOf(category) !== -1 );
		var flares	= this._flareSprites[category];
		if( !flares )	return;
		flares.forEach(function(sprite){
			sprite.material.opacity	= value;
		})
	}.bind(this))
};


THREEx.SportCar.prototype._addFlare	= function(){
	var object	= this._car;
	var scaleA	= 80;
	var scaleB	= 130;

	// FLARES

	var baseUrl	= THREEx.SportCar.baseUrl;
	var flareA	= THREE.ImageUtils.loadTexture( baseUrl+"images/lensflare2.jpg" );
	var flareB	= THREE.ImageUtils.loadTexture( baseUrl+"images/lensflare0.png" );
	var params 	= {
		"frontA" 	: { map: flareA, useScreenCoordinates: false, color: 0xffffff, blending: THREE.AdditiveBlending },
		"frontB" 	: { map: flareB, useScreenCoordinates: false, color: 0xffffff, blending: THREE.AdditiveBlending },
		"backA" 	: { map: flareA, useScreenCoordinates: false, color: 0xff0000, blending: THREE.AdditiveBlending },
		"backB" 	: { map: flareB, useScreenCoordinates: false, color: 0xff0000, blending: THREE.AdditiveBlending }
	};

	if( this._opts.type === "gallardo" ){
		var flares = [
			// front
			[ "frontA", scaleA, [ 70, 10, 160 ] ]	, [ "frontA", scaleA, [ 66, -1, 175 ] ]	, [ "frontA", scaleA, [ 66, -1, 165 ] ],
			[ "frontB", scaleB, [ 70, 10, 160 ] ]	, [ "frontB", scaleB, [ 66, -1, 175 ] ]	, [ "frontB", scaleB, [ 66, -1, 165 ] ],	
			[ "frontA", scaleA, [ -70, 10, 160 ] ]	, [ "frontA", scaleA, [ -66, -1, 175 ] ], [ "frontA", scaleA, [ -66, -1, 165 ] ],
			[ "frontB", scaleB, [ -70, 10, 160 ] ]	, [ "frontB", scaleB, [ -66, -1, 175 ] ], [ "frontB", scaleB, [ -66, -1, 165 ] ],
			// back
			[ "backA", scaleA, [ 61, 19, -185 ] ]	, [ "backA", scaleA, [ 55, 19, -185 ] ],
			[ "backB", scaleB, [ 61, 19, -185 ] ]	, [ "backB", scaleB, [ 55, 19, -185 ] ],
			[ "backA", scaleA, [ -61, 19, -185 ] ]	, [ "backA", scaleA, [ -55, 19, -185 ] ],
			[ "backB", scaleB, [ -61, 19, -185 ] ]	, [ "backB", scaleB, [ -55, 19, -185 ] ],
		];
		
	}else if( this._opts.type === "veyron" ){
		var flares = [
			// front
			[ "frontA", scaleA, [  47, 38, 120 ] ]	, [ "frontA", scaleA, [  40, 38, 120 ] ], [ "frontA", scaleA, [  32, 38, 122 ] ],
			[ "frontB", scaleB, [  47, 38, 120 ] ]	, [ "frontB", scaleB, [  40, 38, 120 ] ], [ "frontB", scaleB, [  32, 38, 122 ] ],
			[ "frontA", scaleA, [ -47, 38, 120 ] ]	, [ "frontA", scaleA, [ -40, 38, 120 ] ], [ "frontA", scaleA, [ -32, 38, 122 ] ],
			[ "frontB", scaleB, [ -47, 38, 120 ] ]	, [ "frontB", scaleB, [ -40, 38, 120 ] ], [ "frontB", scaleB, [ -32, 38, 122 ] ],
			// back
			[ "backA", scaleA, [  22, 50, -123 ] ]	, [ "backA", scaleA, [  32, 49, -123 ] ],
			[ "backB", scaleB, [  22, 50, -123 ] ]	, [ "backB", scaleB, [  32, 49, -123 ] ],
			[ "backA", scaleA, [ -22, 50, -123 ] ]	, [ "backA", scaleA, [ -32, 49, -123 ] ],
			[ "backB", scaleB, [ -22, 50, -123 ] ]	, [ "backB", scaleB, [ -32, 49, -123 ] ],		
		];
	}else	console.assert(false);

	for( var i = 0; i < flares.length; i ++ ){
		var flare	= flares[i];
		var name	= flare[ 0 ];
		var param	= params[ name ];
		var scale	= flare[ 1 ] * this._car.modelScale;
		var position	= flare[ 2 ];

		var sprite	= new THREE.Sprite( new THREE.SpriteMaterial(param) );
		sprite.scale.set( scale, scale, scale );
		sprite.position.set(position[0], position[1], position[2])
		// add the sprite
		object.bodyMesh.add( sprite );

		this._flareSprites[name]	= this._flareSprites[name] || [];
		this._flareSprites[name].push( sprite );
	}
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.SportCar.prototype._setNormalMaterial	= function()
{
	var car		= this._car;
	var materials	= car.bodyMaterials;
	materials[ 0 ]	= new THREE.MeshNormalMaterial();	// body
	materials[ 1 ]	= new THREE.MeshNormalMaterial();	// front under lights, back

	var materials	= car.wheelMaterials;
	materials[ 0 ]	= new THREE.MeshNormalMaterial();	// insides
	materials[ 1 ]	= new THREE.MeshNormalMaterial();	// tire
}

THREEx.SportCar.prototype._setNiceMaterial	= function(){
	var textureCube	= THREEx.createTextureCube('swedishroyalcastle');

	// directly from altered demo
	var mlib	= {
		body: [],

		"Chrome"	: new THREE.MeshPhongMaterial( { color: 0xffffff, ambient: 0xffffff, envMap: textureCube  } ),
		"ChromeN"	: new THREE.MeshPhongMaterial( { color: 0xffffff, ambient: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.75  } ),
		"Dark chrome"	: new THREE.MeshPhongMaterial( { color: 0x444444, ambient: 0x444444, envMap: textureCube } ),

		"Black rough"	: new THREE.MeshPhongMaterial( { color: 0x050505, ambient: 0x050505 } ),

		"Dark glass"	: new THREE.MeshPhongMaterial( { color: 0x101020, ambient: 0x101020, envMap: textureCube, opacity: 0.5, transparent: true } ),
		"Orange glass"	: new THREE.MeshPhongMaterial( { color: 0xffbb00, ambient: 0xffbb00, opacity: 0.5, transparent: true } ),
		"Red glass"	: new THREE.MeshPhongMaterial( { color: 0xff0000, ambient: 0xff0000, opacity: 0.5, transparent: true } ),

		"Black metal"	: new THREE.MeshPhongMaterial( { color: 0x222222, ambient: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Orange metal"	: new THREE.MeshPhongMaterial( { color: 0xff6600, ambient: 0xff6600, envMap: textureCube, combine: THREE.MultiplyOperation } )
	}

	mlib.body.push( [ "Orange"	, new THREE.MeshPhongMaterial( { color: 0x883300, ambient: 0x883300, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.1 } ) ] );
	mlib.body.push( [ "Blue"	, new THREE.MeshPhongMaterial( { color: 0x113355, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.1 } ) ] );
	mlib.body.push( [ "Red"		, new THREE.MeshPhongMaterial( { color: 0x660000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.1 } ) ] );
	mlib.body.push( [ "Black"	, new THREE.MeshPhongMaterial( { color: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.2 } ) ] );
	mlib.body.push( [ "White"	, new THREE.MeshPhongMaterial( { color: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.2 } ) ] );

	mlib.body.push( [ "Carmine"	, new THREE.MeshPhongMaterial( { color: 0x770000, specular: 0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ) ] );
	mlib.body.push( [ "Gold"	, new THREE.MeshPhongMaterial( { color: 0xaa9944, specular: 0xbbaa99, shininess: 50, envMap: textureCube, combine: THREE.MultiplyOperation } ) ] );
	mlib.body.push( [ "Bronze"	, new THREE.MeshPhongMaterial( { color: 0x150505, specular: 0xee6600, shininess: 10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.2 } ) ] );
	mlib.body.push( [ "Chrome"	, new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ) ] );

	var car	= this._car;
	if( this._opts.type === 'gallardo' ){
		// BODY
		var materials	= car.bodyMaterials;
		materials[ 0 ]	= mlib.body[ 0 ][ 1 ]; 		// body
		materials[ 1 ]	= mlib[ "Dark chrome" ]; 	// front under lights, back
		materials[ 1 ]	= mlib[ "Orange metal" ]; 	// front under lights, back
		materials[ 4 ]	= mlib[ "Chrome" ]; 		// front under lights, back

		// WHEELS
		var materials	= car.wheelMaterials;
		materials[ 0 ]	= mlib[ "Chrome" ];		// insides
		materials[ 1 ]	= mlib[ "Black rough" ];		// tire
	}else if( this._opts.type === 'veyron' ){
		// 0 - top, front center, back sides
		// 1 - front sides
		// 2 - engine
		// 3 - small chrome things
		// 4 - backlights
		// 5 - back signals
		// 6 - bottom, interior
		// 7 - windshield
		
		// BODY
		var materials	= car.bodyMaterials;
		materials[ 0 ]	= mlib[ "Black metal" ];		// top, front center, back sides
		materials[ 1 ]	= mlib[ "Chrome" ];		// front sides
		materials[ 2 ]	= mlib[ "Chrome" ];		// engine
		materials[ 3 ]	= mlib[ "Dark chrome" ];		// small chrome things
		materials[ 4 ]	= mlib[ "Red glass" ];		// backlights
		materials[ 5 ]	= mlib[ "Orange glass" ];	// back signals
		materials[ 6 ]	= mlib[ "Black rough" ];		// bottom, interior
		materials[ 7 ]	= mlib[ "Dark glass" ];		// windshield
		
		// WHEELS		
		var materials	= car.wheelMaterials;
		materials[ 0 ]	= mlib[ "Chrome" ];		// insides
		materials[ 1 ]	= mlib[ "Black rough" ];		// tire
	}else	console.assert( false );
}

