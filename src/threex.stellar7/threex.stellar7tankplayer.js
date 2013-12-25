var THREEx	= THREEx	|| {}

THREEx.Stellar7TankPlayer	= function(){
	this.id		= THREEx.Stellar7TankPlayer.id++

	// add EventDispatcher in this object
	THREE.EventDispatcher.prototype.apply(this)

	// internal render function
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		model								//
	//////////////////////////////////////////////////////////////////////////////////

	var model	= new THREEx.Stellar7TankModel()
	this.model	= model

	//////////////////////////////////////////////////////////////////////////////////
	//		controls							//
	//////////////////////////////////////////////////////////////////////////////////

	var tankControls= new THREEx.Stellar7TankControls(model)
	onRenderFcts.push(function(delta, now){
		tankControls.update(delta, now)
	})
		
	// TODO this should not be duplicated
	// - maybe THREEx.Stellar7TankPlayer.createKeyboardControls with a better name
	var keyboard	= new THREEx.KeyboardState()

	var controls	= new THREEx.Stellar7TankKeyboardControls(keyboard, tankControls)
	this.controls	= controls
	onRenderFcts.push(function(delta, now){
		controls.update(delta, now)
	})
	controls.addEventListener('fire', function(){
		this.dispatchEvent({ type: 'fire' })
	}.bind(this))


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	this.onTankCollision	= function(){}
	this.onShootCollision	= function(){}
	this.onHitByShoot	= function(){}
}

THREEx.Stellar7TankPlayer.id	= 0