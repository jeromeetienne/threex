var SoundsBank	= function(soundEnabled){
	// default arguments values
	soundEnabled	= soundEnabled !== undefined ? soundEnabled : true
	//////////////////////////////////////////////////////////////////////////////////
	//		webaudiox							//
	//////////////////////////////////////////////////////////////////////////////////
	/**
	 * local shim for window.AudioContext
	 */
	var AudioContext	= window.AudioContext || window.webkitAudioContext;

	// if the Web Audio API is detected or not, force disable sound
	if( !AudioContext )	soundEnabled	= false
	// expose this.soundEnabled
	this.soundEnabled	= soundEnabled

	// if WebAudioDetected === false, declare needed functions
	if( soundEnabled === false ){
		// NOTE: one liner to extract all the .play*() function
		// Object.keys(soundsBank).filter(function(property){return /^play/.test(property)}).forEach(function(fnName){console.log('this.'+fnName+'\t= function(){}')})
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
	lineOut.volume	= 1
	// expose lineOut
	this.lineOut	= lineOut

	// handle updateFcts for this
	var updateFcts	= [];
	this.updateFcts	= updateFcts;
	this.update	= function(delta, now){
		this.updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * setup a WebAudiox.ListenerObject3DUpdater for a given object3d
	 * @param  {THREE.Object3D} object3d the object3d which represent the listener
	 * @return {WebAudiox.ListenerObject3DUpdater} just built
	 */
	this.setListenerUpdater	= function(object3d){
		// put a ListenerObject3DUpdater
		var listenerUpdater	= new WebAudiox.ListenerObject3DUpdater(context, camera)
		updateFcts.push(function(delta, now){
			listenerUpdater.update(delta, now)
		})
		return listenerUpdater
	}

	// load the sound
	//WebAudiox.loadBuffer(context, 'sounds/techno.mp3', function(buffer){
	WebAudiox.loadBuffer(context, 'sounds/132134__filmfx__scary-violin.mp3', function(buffer){
		this.sharkTrackBuffer	= buffer;
	}.bind(this))
	// setup a play function
	this.playSharkTrack	= function(object3d){
		// if buffer not yet loaded do nothing
		if( !this.sharkTrackBuffer )	return
		var destination	= lineOut.destination;

		// init AudioPannerNode
		var panner	= context.createPanner()
		panner.coneOuterGain	= 0.1
		panner.coneOuterAngle	= Math.PI *180/Math.PI
		panner.coneInnerAngle	= 0 *180/Math.PI
		panner.connect(destination)
		destination	= panner
		// put a PannerObject3DUpdater
		var pannerUpdater	= new WebAudiox.PannerObject3DUpdater(panner, object3d)
		updateFcts.push(function(delta, now){
			pannerUpdater.update(delta, now)
		})

		
		var volumeGain	= context.createGain()
		volumeGain.connect(destination)
		volumeGain.gain.value	= 40
		destination	= volumeGain

		// init AudioBufferSourceNode
		var source	= context.createBufferSource();
		source.buffer	= this.sharkTrackBuffer
		source.loop	= true
		source.connect(destination)
		destination	= source

		updateFcts.push(function(delta, now){
			var direction	= GAME.ball.position.clone().sub(object3d.position);
			var intensity	= direction.length()
			// all the same when it is further than 4
			intensity	= Math.min(intensity, 4)
			// put it between 0 and 1
			intensity	= (4 - intensity)/4
			// change playbackRate
			source.playbackRate.value	= 1 + intensity*1;
			// change gain
			volumeGain.gain.value	= 0.0+intensity*2
			// this sound is subsampled
			volumeGain.gain.value	*= 100
		})		

		
		// start the sound now
		source.start(0);
	}
	

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init eatPill sound
	this.playSoundTrack	= function(){
return
		if( !this.soundTrack )	return

		var source	= context.createBufferSource()
		source.buffer	= this.soundTrack
		source.loop	= true
		source.connect(lineOut.destination)
		source.start(0)
	}
	WebAudiox.loadBuffer(context, 'sounds/marbles.mp3', function(buffer){
		this.soundTrack	= buffer;
		//this.playSoundTrack()
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init eatPill sound
	this.playEatPill	= function(){
		if( !this.eatPillBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= this.eatPillBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	WebAudiox.loadBuffer(context, 'sounds/eatpill.mp3', function(buffer){
		this.eatPillBuffer	= buffer;
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init kick sound
	this.playKick	= function(volume){
return
		if( !this.kickBuffer )	return
		var destination	= lineOut.destination

		var volumeGain	= context.createGain()
		volumeGain.connect(destination)
		volumeGain.gain.value	= volume
		destination	= volumeGain

		var source	= context.createBufferSource()
		source.buffer	= this.kickBuffer
		source.connect(destination)
		source.start(0)		
	}
	WebAudiox.loadBuffer(context, 'sounds/kick.wav', function(buffer){
		this.kickBuffer	= buffer;
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////


	// init a sound with jsfx
	this.playRoll	= function(object3d){
return
		if( !this.rollBuffer )	return

		var source	= context.createBufferSource();
		source.buffer	= this.rollBuffer;
		source.loop	= true
		source.connect(lineOut.destination);
		source.start(0);

		this.updateFcts.push(function(delta, now){
			// compute body speed
			var body	= object3d.userData.cannonBody.body
			var speed	= body.velocity.norm();
			// set playbackRate depending on speed
			source.playbackRate.value	= 0.0001 + speed * 0.9;
			// if the object3d dont touch the ground, gain is 0
			var onGround		= body.position.y >= 0.25 && body.position.y <= 0.3;
			source.gain.value	= onGround ? 1 : 0;
		})
	}
	WebAudiox.loadBuffer(context, 'sounds/roll.mp3', function(buffer){
		this.rollBuffer	= buffer
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	this.playSpawn	= function(){
return
		if( !this.spawnBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= this.spawnBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["square",0.0000,0.4000,0.0000,0.3200,0.0000,0.2780,20.0000,496.0000,2400.0000,0.4640,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0235,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
	this.spawnBuffer	= WebAudiox.getBufferFromJsfx(context, lib)


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	this.playDie	= function(){
return
		if( !this.dieBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= this.dieBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["square",0.0000,0.4000,0.0000,0.0240,0.0000,0.2680,20.0000,560.0000,2400.0000,-0.5220,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.2295,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.2130,0.0000]
	this.dieBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	this.playBounce	= function(){
		if( !this.bounceBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= this.bounceBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["saw",0.0000,0.4000,0.0000,0.2040,0.0000,0.2740,20.0000,528.0000,2400.0000,0.1220,0.0000,0.5620,24.8208,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000];
	this.bounceBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	this.playExplosion	= function(){
		if( !this.explosionBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= this.explosionBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["noise",0.0000,0.4000,0.0000,0.3660,0.5220,0.1660,20.0000,149.0000,2400.0000,0.2640,0.0000,0.0000,0.0100,0.0003,0.0000,-0.1840,0.8900,0.0000,0.0000,0.6024,-0.0640,-0.2760,1.0000,0.0000,0.0000,0.0000,0.0000]	
	this.explosionBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	this.playScoreup	= function(){
return
		if( !this.scoreupBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= this.scoreupBuffer
		source.connect(lineOut.destination)
		source.start(0)
	}
	var lib		= ["saw",0.0000,0.4000,0.0000,0.2020,0.0000,0.4040,20.0000,443.0000,2400.0000,0.3240,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.7456,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]	
	this.scoreupBuffer	= WebAudiox.getBufferFromJsfx(context, lib)
}
