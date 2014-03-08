/**
 * implement Ratamahatta character.
 * TODO seems to have issue with multilple characters. it may be about material 
 * caching. seems typically a microcache issue.
 *
 * @name	THREEx.RatamahattaMD2Character
 * @augments	THREEx.MD2Character
 * @constructor
*/
THREEx.RatamahattaMD2Character	= function(opts){
	// call parent ctor
	var parent	= THREEx.RatamahattaMD2Character.parent;
	parent.constructor.call(this)

	// handle the attachedWorld
	this._attachedWorld	= null;
	this._$loopCb		= this._loopCb.bind(this);

	// change the scale
	this.scale(0.03);

	// load the data
	this.load({
		baseUrl	: THREEx.RatamahattaMD2Character.baseUrl+'/models/ratamahatta/',
		body	: "ratamahatta.js",
		//skins	: [ "ratamahatta.png"],
		skins	: [ "ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png" ],
		weapons	: [
			[ "weapon.js", "weapon.png" ],
			[ "w_bfg.js", "w_bfg.png" ],
			[ "w_blaster.js", "w_blaster.png" ],
			[ "w_chaingun.js", "w_chaingun.png" ],
			[ "w_glauncher.js", "w_glauncher.png" ],
			[ "w_hyperblaster.js", "w_hyperblaster.png" ],
			[ "w_machinegun.js", "w_machinegun.png" ],
			[ "w_railgun.js", "w_railgun.png" ],
			[ "w_rlauncher.js", "w_rlauncher.png" ],
			[ "w_shotgun.js", "w_shotgun.png" ],
			[ "w_sshotgun.js", "w_sshotgun.png" ]
		]
	});
}

THREEx.RatamahattaMD2Character.baseUrl	= "../";

/**
 * inherit from THREEx.MD2Character
*/
THREEx.inherit(THREEx.RatamahattaMD2Character, THREEx.MD2Character);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.RatamahattaMD2Character.prototype.attach	= function(world){
	if( this._attachedWorld )	this.detacheFrom(this.attachedWorld);
	world	= world	|| THREEx.world;
	this._attachedWorld	= world;
	world.add( this.container() )
	world.hook(this._$loopCb);	
	return this;	// for chained API
};

THREEx.RatamahattaMD2Character.prototype.detach	= function(){
	world	= world || this._attachedWorld;
	world.remove(this.container())
	world.unhook(this._$loopCb);
	this._attachedWorld	= null;
	return this;	// for chained API
};

THREEx.RatamahattaMD2Character.prototype._loopCb	= function(delta, now){
	this.update( delta, now);
}

//////////////////////////////////////////////////////////////////////////////////
//		.turn()								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Turn to an angle
 * 
 * @param {Number} angle angle to turn to in radian 
*/
THREEx.RatamahattaMD2Character.prototype.turn	= function(angle){
	var character	= this;
	if( angle === undefined, "angle MUST be defined" );
	if( this.isLoaded() === false )	return this;
	var container	= character.container();
	container.rotation.y	+= angle;
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		.go()								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * go forward to a distance
 * 
 * @param {Number} angle angle to turn to in radian 
*/
THREEx.RatamahattaMD2Character.prototype.goForward	= function(distance){
	if( this.isLoaded() === false )	return this;
	distance	= distance !== undefined ? distance : 0.05;
	var container	= this.container();
	var angle	= container.rotation.y;
	
	var speed	= new THREE.Vector3(0, 0, distance);
	var matrix	= new THREE.Matrix4().makeRotationY(angle);
	speed.applyMatrix4( matrix );
	container.position.add(speed);
	return this;	// for chained API
};
