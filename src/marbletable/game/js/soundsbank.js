var SoundsBank	= function(){
	var sounds	= {}
	//////////////////////////////////////////////////////////////////////////////////
	//		webaudiox							//
	//////////////////////////////////////////////////////////////////////////////////
	/**
	 * local shim for window.AudioContext
	 */
	var AudioContext	= window.AudioContext || window.webkitAudioContext;
	/**
	 * show if the Web Audio API is detected or not
	 * @type {boolean}
	 */
	this.webAudioDetected	= AudioContext ? true : false

	// if WebAudioDetected === false, declare needed
	if( this.webAudioDetected === false ){
		// NOTE: one liner to extract all the .play*() function
		// Object.keys(sounds).filter(function(property){return /^play/.test(property)}).forEach(function(fnName){console.log('this.'+fnName+'\t= function(){}')})
		this.playSoundTrack	= function(){}
		this.playEatPill	= function(){}
		this.playKick		= function(){}
		this.playRoll		= function(){}
		this.playSpawn		= function(){}
		this.playDie		= function(){}
		this.playBounce		= function(){}
		this.playExplosion	= function(){}
		this.playScoreup	= function(){}
		return
	}
	
	var context	= new AudioContext()

	// Create lineOut
	var lineOut	= new WebAudiox.LineOut(context)
	lineOut.volume	= 0.2
	// expose lineOut
	sounds.lineOut	= lineOut

	// handle updateFcts for sounds
	sounds.updateFcts	= [];
	sounds.update	= function(delta, now){
		sounds.updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init eatPill sound
	sounds.playSoundTrack	= function(){
		if( !sounds.soundTrack )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.soundTrack
		source.loop	= true
		source.connect(lineOut.destination)
		source.start(0)
	}
	WebAudiox.loadBuffer(context, 'sounds/marbles.mp3', function(buffer){
		sounds.soundTrack	= buffer;
		sounds.playSoundTrack()
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init eatPill sound
	sounds.playEatPill	= function(){
		if( !sounds.eatPillBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.eatPillBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	WebAudiox.loadBuffer(context, 'sounds/eatpill.mp3', function(buffer){
		sounds.eatPillBuffer	= buffer;
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init kick sound
	sounds.playKick	= function(volume){
		if( !sounds.kickBuffer )	return
		var destination	= lineOut.destination

		var volumeGain	= context.createGain()
		volumeGain.connect(destination)
		volumeGain.gain.value	= volume
		destination	= volumeGain

		var source	= context.createBufferSource()
		source.buffer	= sounds.kickBuffer
		source.connect(destination)
		source.start(0)		
	}
	WebAudiox.loadBuffer(context, 'sounds/kick.wav', function(buffer){
		sounds.kickBuffer	= buffer;
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////


	// init a sound with jsfx
	sounds.playRoll	= function(object3d){
		if( !sounds.rollBuffer )	return

		var source	= context.createBufferSource();
		source.buffer	= sounds.rollBuffer;
		source.loop	= true
		source.connect(lineOut.destination);
		source.start(0);

		sounds.updateFcts.push(function(delta, now){
			// compute body speed
			var body	= object3d.userData.cannonBody.origin
			var speed	= body.velocity.norm();
			// set playbackRate depending on speed
			source.playbackRate.value	= 0.0001 + speed * 0.9;
			// if the object3d dont touch the ground, gain is 0
			var onGround		= body.position.y >= 0.25 && body.position.y <= 0.3;
			source.gain.value	= onGround ? 1 : 0;
		})
	}
	WebAudiox.loadBuffer(context, 'sounds/roll.mp3', function(buffer){
		sounds.rollBuffer	= buffer
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playSpawn	= function(){
		if( !sounds.spawnBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.spawnBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["square",0.0000,0.4000,0.0000,0.3200,0.0000,0.2780,20.0000,496.0000,2400.0000,0.4640,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0235,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
	sounds.spawnBuffer	= WebAudiox.getBufferFromJsfx(context, lib)


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playDie	= function(){
		if( !sounds.bounceBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.dieBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["square",0.0000,0.4000,0.0000,0.0240,0.0000,0.2680,20.0000,560.0000,2400.0000,-0.5220,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.2295,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.2130,0.0000]
	sounds.dieBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playBounce	= function(){
		if( !sounds.bounceBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.bounceBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["saw",0.0000,0.4000,0.0000,0.2040,0.0000,0.2740,20.0000,528.0000,2400.0000,0.1220,0.0000,0.5620,24.8208,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000];
	sounds.bounceBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playExplosion	= function(){
		if( !sounds.explosionBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.explosionBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["noise",0.0000,0.4000,0.0000,0.3660,0.5220,0.1660,20.0000,149.0000,2400.0000,0.2640,0.0000,0.0000,0.0100,0.0003,0.0000,-0.1840,0.8900,0.0000,0.0000,0.6024,-0.0640,-0.2760,1.0000,0.0000,0.0000,0.0000,0.0000]	
	sounds.explosionBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playScoreup	= function(){
		if( !sounds.scoreupBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= sounds.scoreupBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["saw",0.0000,0.4000,0.0000,0.2020,0.0000,0.4040,20.0000,443.0000,2400.0000,0.3240,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.7456,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]	
	sounds.scoreupBuffer	= WebAudiox.getBufferFromJsfx(context, lib)

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	return sounds;	
}
