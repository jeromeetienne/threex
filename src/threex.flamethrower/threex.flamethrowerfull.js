var THREEx	= THREEx	|| {}

THREEx.FlameThrowerFull	= function(position, velocity, container, onReady){
	// handle local loop
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var sound;
	var emitter;

	new THREEx.FlameThrowerTexture(function(texture){

		// webaudio API shim
		window.AudioContext	= window.AudioContext || window.webkitAudioContext
		var context	= new AudioContext()
	
		// create and update sound
		sound	= new WebAudiox.FlameThrower(context, context.destination)
		updateFcts.push(function(delta, now){ sound.update(delta, now)	}) 

		var flameSprite	= new THREEx.FlameThrowerSprite(texture)

		// create and update the emitter
		emitter	= new THREEx.FlameThrowerEmitter(flameSprite, container)
		updateFcts.push(function(delta, now){ emitter.update(delta, now)	}) 

		emitter.start(15, function(){
			emitter.emitOne(position, velocity)
		})
		// notify 
		onReady();
	})
	//////////////////////////////////////////////////////////////////////////////////
	//		API								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.start	= function(){
		if( this.isReady() === false )	return
		sound.trigger.start()
		emitter.trigger.start()
	}
	this.stop	= function(){
		if( this.isReady() === false )	return
		sound.trigger.stop()
		emitter.trigger.stop()
	}
	this.isReady	= function(){
		if( sound === undefined )	return false
		if( emitter === undefined )	return false
		return true
	}
}
