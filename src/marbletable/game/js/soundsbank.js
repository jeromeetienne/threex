var SoundsBank	= function(){
	var sounds	= {}
	//////////////////////////////////////////////////////////////////////////////////
	//		webaudiox							//
	//////////////////////////////////////////////////////////////////////////////////
	var contextx	= new WebAudiox.Contextx()
	contextx.volume	= 0.5

	sounds.contextx	= contextx

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
		var source	= contextx.context.createBufferSource()
		source.buffer	= sounds.soundTrack
		source.loop	= true
		source.connect(contextx.masterOut)
		source.start(0)
	}
	WebAudiox.loadBuffer(contextx.context, 'sounds/marbles.mp3', function(buffer){
		sounds.soundTrack	= buffer;
		sounds.playSoundTrack()
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init eatPill sound
	sounds.playEatPill	= function(){
		if( !sounds.eatPillBuffer )	return
		var source	= contextx.context.createBufferSource()
		source.buffer	= sounds.eatPillBuffer
		source.connect(contextx.masterOut)
		source.start(0)
	}
	WebAudiox.loadBuffer(contextx.context, 'sounds/eatpill.mp3', function(buffer){
		sounds.eatPillBuffer	= buffer;
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init kick sound
	sounds.playKick	= function(volume){
		if( !sounds.kickBuffer )	return
		var destination	= contextx.masterOut

		var volumeGain	= contextx.context.createGain()
		volumeGain.connect(destination)
		volumeGain.gain.value	= volume
		destination	= volumeGain

		var source	= contextx.context.createBufferSource()
		source.buffer	= sounds.kickBuffer
		source.connect(destination)
		source.start(0)		
	}
	WebAudiox.loadBuffer(contextx.context, 'sounds/kick.wav', function(buffer){
		sounds.kickBuffer	= buffer;
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////


	// init a sound with jsfx
	sounds.playRoll	= function(object3d){
		if( !sounds.rollBuffer )	return

		var source	= contextx.context.createBufferSource();
		source.buffer	= sounds.rollBuffer;
		source.loop	= true
		source.connect(contextx.masterOut);
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
	WebAudiox.loadBuffer(contextx.context, 'sounds/roll.mp3', function(buffer){
		sounds.rollBuffer	= buffer
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playSpawn	= function(){
		if( !sounds.spawnBuffer )	return
		var source	= contextx.context.createBufferSource()
		source.buffer	= sounds.spawnBuffer
		source.connect(contextx.masterOut)
		source.start(0)
	}
	var lib		= ["square",0.0000,0.4000,0.0000,0.3200,0.0000,0.2780,20.0000,496.0000,2400.0000,0.4640,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0235,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
	sounds.spawnBuffer	= WebAudiox.getBufferFromJsfx(contextx.context, lib)


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playDie	= function(){
		if( !sounds.bounceBuffer )	return
		var source	= contextx.context.createBufferSource()
		source.buffer	= sounds.dieBuffer
		source.connect(contextx.masterOut)
		source.start(0)
	}
	var lib		= ["square",0.0000,0.4000,0.0000,0.0240,0.0000,0.2680,20.0000,560.0000,2400.0000,-0.5220,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.2295,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.2130,0.0000]
	sounds.dieBuffer	= WebAudiox.getBufferFromJsfx(contextx.context, lib)
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init a sound with jsfx
	sounds.playBounce	= function(){
		if( !sounds.bounceBuffer )	return
		var source	= contextx.context.createBufferSource()
		source.buffer	= sounds.bounceBuffer
		source.connect(contextx.masterOut)
		source.start(0)
	}
	var lib		= ["saw",0.0000,0.4000,0.0000,0.2040,0.0000,0.2740,20.0000,528.0000,2400.0000,0.1220,0.0000,0.5620,24.8208,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000];
	sounds.bounceBuffer	= WebAudiox.getBufferFromJsfx(contextx.context, lib)
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	
	return sounds;	
}
