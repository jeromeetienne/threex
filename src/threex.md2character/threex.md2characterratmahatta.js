var THREEx	= THREEx || {}

/**
 * widely inspired from MD2Character.js from alteredq / http://alteredqualia.com/
 *
 * @name THREEx.MD2Character
 * @class
*/
THREEx.MD2CharacterRatmahatta	= function(onLoad){
	// update function
	var onRenderFcts= [];
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////

	var character	= new THREEx.MD2Character()
	this.character	= character
	onRenderFcts.push(function(delta){
		character.update(delta)
	})


	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////
	var controls	= new THREEx.MD2CharacterControls(character.object3d)
	this.controls	= controls
	onRenderFcts.push(function(delta, now){
		controls.update(delta, now)
	})

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////
	// load the data
	// - TODO make all this data cachable, thus 2 instances load only once
	// - take a microcache.js and put it in THREEx.MD2Character
	character.load({
		baseUrl	: THREEx.MD2CharacterRatmahatta.baseUrl+'models/ratamahatta/',
		body	: "ratamahatta.js",
		//skins	: [ "ratamahatta.png"],
		skins	: [ "ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png" ],
		weapons	: [
			[ "weapon.js"		, "weapon.png" ],
			[ "w_bfg.js"		, "w_bfg.png" ],
			[ "w_blaster.js"	, "w_blaster.png" ],
			[ "w_chaingun.js"	, "w_chaingun.png" ],
			[ "w_glauncher.js"	, "w_glauncher.png" ],
			[ "w_hyperblaster.js"	, "w_hyperblaster.png" ],
			[ "w_machinegun.js"	, "w_machinegun.png" ],
			[ "w_railgun.js"	, "w_railgun.png" ],
			[ "w_rlauncher.js"	, "w_rlauncher.png" ],
			[ "w_shotgun.js"	, "w_shotgun.png" ],
			[ "w_sshotgun.js"	, "w_sshotgun.png" ],
		]
	})
	character.addEventListener('loaded', function(){
		onLoad && onLoad(this)
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////

	var skinIndexes	= {
		ratamahatta	: 0,
		ctf_b		: 1,
		ctf_r		: 2,
		dead		: 3,
		gearwhore	: 4,
	}
	this.skinNames	= Object.keys(skinIndexes)
	this.setSkinName= function(skinName){
		console.assert(skinIndexes[skinName] !== undefined)
		character.setSkin(skinIndexes[skinName])
	}


	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////
	var weaponIndexes	= {
		none		: -1,
		weapon		: 0,
		w_bfg		: 1,
		w_blaster	: 2,
		w_chaingun	: 3,
		w_glauncher	: 4,
		w_hyperblaster	: 5,
		w_machinegun	: 6,
		w_railgun	: 7,
		w_rlauncher	: 8,
		w_shotgun	: 9,
		w_sshotgun	: 10,
	}
	this.weaponNames	= Object.keys(weaponIndexes)
	this.setWeaponName	= function(weaponName){
		console.assert(weaponIndexes[weaponName] !== undefined)
		character.setWeapon(weaponIndexes[weaponName])
	}

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////

	// obtained from Object.keys(character.meshBody.geometry.animations) AFTER loading
	var animationNames	= ["stand", "run", "attack", "pain", "jump", "flip", "salute", "taunt", "wave", "point", "crstand", "crwalk", "crattack", "crpain", "crdeath", "death"]
	this.animationNames	= animationNames
	this.setAnimationName	= function(animationName){
		console.assert(animationNames.indexOf(animationName) !== -1)
		character.setAnimation(animationName)
	}
}

THREEx.MD2CharacterRatmahatta.baseUrl	= '../'

