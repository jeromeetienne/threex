/**
 * @fileoverview
 * 
 * TODO add _ prefix to private properties
 * TODO much cleanup needed
 * TODO no change of property from outside. use getter/setter
 * TODO only chained API
*/

var THREEx	= THREEx || {}

/**
 * widely inspired from MD2Character.js from alteredq / http://alteredqualia.com/
 *
 * @name THREEx.MD2Character
 * @class
*/
THREEx.MD2Character	= function(){
	this.scale		= 1/49;
	this.animationFPS	= 6;

	this.object3d		= new THREE.Object3D();

	this.meshBody		= null;
	this.meshWeapon		= null;

	this.texturesBody	= [];
	this.texturesWeapon	= [];

	this._weapons		= [];

	this._curAnimation	= null;
	this.nLoadInProgress	= 0;
}

// make it eventable
// THREEx.MicroeventMixin(THREEx.MD2Character.prototype);

/**
 * Destructor
*/
THREEx.MD2Character.prototype.destroy	= function()
{
	console.log("THREEx.MD2Character destoy")
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
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
})(THREEx.MD2Character.prototype)

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Update the animation
 * 
 * @param {Number} delta nb seconds since the last update
*/
THREEx.MD2Character.prototype.update	= function( delta ){
	if ( this.meshBody ) {
		var direction	= this.meshBody.direction;
		var timeBefore	= this.meshBody.time;
		// update the animation
		this.meshBody.updateAnimation( 1000 * delta );
		// ugly kludge to get an event 'animationCompleted'
		var timeAfter	= this.meshBody.time;
		if( (direction === 1 && timeBefore > timeAfter) || (direction === -1 && timeAfter < timeBefore) ){
			this.dispatchEvent("animationCompleted", this, this._curAnimation)
		}
	}
	if ( this.meshWeapon ) {
		this.meshWeapon.updateAnimation( 1000 * delta );
	}
	return this;	// for chained API
};

/**
 * @return {Boolean} true if the character is loaded, false otherwise
*/
THREEx.MD2Character.prototype.isLoaded	= function(){
	return this.nLoadInProgress === 0 ? true : false;
}


//////////////////////////////////////////////////////////////////////////////////
//		Setter								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * @param {Boolean} enable true to enable wireframe, false otherwise
*/
THREEx.MD2Character.prototype.setWireframe = function( enable ){
	// TODO remove the added property on THREE.Mesh
	if( enable ){
		if ( this.meshBody )	this.meshBody.material	= this.meshBody.materialWireframe;
		if ( this.meshWeapon )	this.meshWeapon.material= this.meshWeapon.materialWireframe;
	} else {
		if ( this.meshBody )	this.meshBody.material	= this.meshBody.materialTexture;
		if ( this.meshWeapon )	this.meshWeapon.material= this.meshWeapon.materialTexture;
	}
	return this;	// for chained API
};

/**
 * Set the weapons
 *
 * @param {Number} index the index of the animations
*/
THREEx.MD2Character.prototype.setWeapon = function( index ){
	// make all weapons invisible
	for ( var i = 0; i < this._weapons.length; i ++ ){
		this._weapons[ i ].visible = false;
	}
	// set the active weapon
	var activeWeapon = this._weapons[ index ];

	if( activeWeapon ){
		activeWeapon.visible	= true;
		this.meshWeapon		= activeWeapon;

		activeWeapon.playAnimation( this._curAnimation, this.animationFPS );

		this.meshWeapon.baseDuration	= this.meshWeapon.duration;

		this.meshWeapon.time		= this.meshBody.time;
		this.meshWeapon.duration	= this.meshBody.duration;
	}
	return this;	// for chained API
};

/**
 * set the animation. TODO a setter/getter
 *
 * @param {string} animationName the animation name to set
*/
THREEx.MD2Character.prototype.setAnimation = function( animationName ){
	// for getter
	if( animationName === undefined ){
		return this._curAnimation;
	}
	// for setter when the animation is already the same, do nothign
	if( animationName === this._curAnimation ){
		return this;	// for chained API
	}
	// setter on this.meshBody
	if ( this.meshBody ) {
		// sanity check
		console.assert( Object.keys(this.meshBody.geometry.animations).indexOf(animationName) !== -1 );

		this.meshBody.playAnimation( animationName, this.animationFPS );
		this.meshBody.baseDuration	= this.meshBody.duration;
	}
	// setter on this.meshWeapon
	if ( this.meshWeapon ) {
		// sanity check
		console.assert( Object.keys(this.meshWeapon.geometry.animations).indexOf(animationName) !== -1 );
		this.meshWeapon.playAnimation( animationName, this.animationFPS );
		this.meshWeapon.baseDuration	= this.meshWeapon.duration;
		this.meshWeapon.time		= this.meshBody.time;
	}
	// set the animation itself
	this._curAnimation = animationName;
	return this;	// for chained API
};

/**
 * @param {number} rate the rate to play the object
*/
THREEx.MD2Character.prototype.setPlaybackRate	= function( rate ){
	if ( this.meshBody ){
		this.meshBody.duration = this.meshBody.baseDuration / rate;
	}
	if ( this.meshWeapon ){
		this.meshWeapon.duration = this.meshWeapon.baseDuration / rate;
	}
	return this;	// for chained API
};

/**
 * @param {Number} index set the index of the skin
*/
THREEx.MD2Character.prototype.setSkin	= function( index ){
	if ( this.meshBody && this.meshBody.material.wireframe === false ) {
		console.assert( index < this.texturesBody.length );
		this.meshBody.material.map	= this.texturesBody[ index ];
	}
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		Loader								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Load the part of your characters
*/
THREEx.MD2Character.prototype.load		= function ( config )
{
	this.nLoadInProgress	= config.weapons.length * 2 + config.skins.length + 1;

	var weaponsTextures = []
	for ( var i = 0; i < config.weapons.length; i ++ ){
		weaponsTextures[ i ] = config.weapons[ i ][ 1 ];
	}

	// SKINS
	this.texturesBody	= this._loadTextures( config.baseUrl + "skins/", config.skins );
	this.texturesWeapon	= this._loadTextures( config.baseUrl + "skins/", weaponsTextures );

	// BODY
	var loader	= new THREE.JSONLoader();

	loader.load( config.baseUrl + config.body, function( geometry ) {
		geometry.computeBoundingBox();
console.log('boundingBox', geometry.boundingBox)
console.log('boundingBox h', geometry.boundingBox.max.y - geometry.boundingBox.min.y)

		var mesh	= createPart( geometry, this.texturesBody[ 0 ] );
		mesh.scale.set( this.scale, this.scale, this.scale );
		mesh.position.y	= 0.5

		this.object3d.add( mesh );

		this.meshBody		= mesh;
		this._curAnimation	= geometry.firstAnimation;

		this._checkLoadingComplete();
	}.bind(this));

	// WEAPONS
	var generateCallback = function( index, name ){
		return function( geometry ) {
			var mesh	= createPart( geometry, this.texturesWeapon[ index ] );
			mesh.scale.set( this.scale, this.scale, this.scale );
			mesh.visible	= false;
			mesh.position.y	= 0.5

			mesh.name	= name;

			this.object3d.add( mesh );

			this._weapons[ index ] = mesh;
			this.meshWeapon = mesh;

			this._checkLoadingComplete();
		}.bind(this);
	}.bind(this);

	for ( var i = 0; i < config.weapons.length; i ++ ) {
		var url		= config.baseUrl + config.weapons[ i ][ 0 ];
		var callback	= generateCallback( i, config.weapons[ i ][ 0 ] );
		loader.load( url, callback );
	}

	function createPart( geometry, skinMap ) {
		geometry.computeMorphNormals();

		var whiteMap		= THREE.ImageUtils.generateDataTexture( 1, 1, new THREE.Color( 0xffffff ) );
		var materialWireframe	= new THREE.MeshPhongMaterial({
			color		: 0xffaa00,
			specular	: 0x111111,
			shininess	: 50,
			wireframe	: true,
			shading		: THREE.SmoothShading,
			map		: whiteMap,
			morphTargets	: true,
			morphNormals	: true,
			perPixel	: true,
			metal		: false
		});

		var materialTexture	= new THREE.MeshPhongMaterial({
			color		: 0xffffff,
			specular	: 0x111111,
			shininess	: 50,
			wireframe	: false,
			shading		: THREE.SmoothShading,
			map		: skinMap,
			morphTargets	: true,
			morphNormals	: true,
			perPixel	: true,
			metal		: false
		});
		materialTexture.wrapAround = true;

		//

		var mesh	= new THREE.MorphAnimMesh( geometry, materialTexture );
		mesh.rotation.y = -Math.PI/2;

		mesh.castShadow		= true;
		mesh.receiveShadow	= true;

		//

		mesh.materialTexture	= materialTexture;
		mesh.materialWireframe	= materialWireframe;

		//

		mesh.parseAnimations();

		mesh.playAnimation( geometry.firstAnimation, this.animationFPS );
		mesh.baseDuration	= mesh.duration;

		return mesh;
	};
	return this;	// for chained API
};

THREEx.MD2Character.prototype._checkLoadingComplete	= function()
{
	this.nLoadInProgress--;
	if( this.nLoadInProgress === 0 ){
		this.dispatchEvent('loaded');
	}
}

/**
 * Load a texture and return it
*/
THREEx.MD2Character.prototype._loadTextures	= function( baseUrl, textureUrls )
{
	var mapping	= new THREE.UVMapping();
	var textures	= [];
	var callback	= function(){
		this._checkLoadingComplete()
	}.bind(this);
	// load all textureUrls
	for( var i = 0; i < textureUrls.length; i ++ ){
		var url			= baseUrl + textureUrls[ i ];
		var texture		= THREE.ImageUtils.loadTexture( url, mapping, callback);
		textures[ i ]		= texture;
		textures[ i ].name	= textureUrls[ i ];
	}
	// return them
	return textures;
};
