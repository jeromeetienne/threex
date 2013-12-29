var WebAudiox	= WebAudiox	|| {}

/**
 * granular sound for FlameThrowerEmitter with WebAudio API
 */
WebAudiox.FlameThrower	= function(){
	// webaudio API shim
	window.AudioContext	= window.AudioContext || window.webkitAudioContext

	// init trigger
	var trigger	= new MidiTrigger(0.2, 0.2)
	this.trigger	= trigger;

	
	this.isAvailable= AudioContext ? true : false;	
	var audioCtx	= new AudioContext();	
	var url		= WebAudiox.FlameThrower.baseUrl + 'sounds/flamethrower-freesoundloop.wav';
	var updateFcts	= []
	loadSoundWebAudio(url, function(buffer){
		var sourceNode	= audioCtx.createBufferSource();
		sourceNode.buffer	= buffer;
		sourceNode.loop	= true;

		var gainNode	= audioCtx.createGainNode()
		sourceNode.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		sourceNode.start(0);
		updateFcts.push(function(delta, now){
			var intensity	= trigger.intensity()
			sourceNode.playbackRate.value	= 0.5 + intensity*1.5;
			gainNode.gain.value		= intensity*0;
// gainNode.gain.value		= intensity*30;
		});
	})	
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	
	function loadSoundWebAudio(url, onLoad, onError){
		onLoad	= onLoad	|| function(){}
		onError	= onError	|| function(){}
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			audioCtx.decodeAudioData(request.response, onLoad, onError);
		}
		request.send();
	}
	/**
	 * trigger with a attack, a sustain and a release. like midi notes
	 * 
	 * @param {Number} attackDelay  nb second for the attack phase
	 * @param {Number} releaseDelay nb second for the release phase
	 * @param {Number} maxValue     the maximum value of the intensity
	 */
	function MidiTrigger(attackDelay, releaseDelay){
		var lastStart	= 0, lastStop	= 0;
		this.start	= function(){ lastStart = Date.now()/1000 }
		this.stop	= function(){ lastStop  = Date.now()/1000 }
		this.intensity	= function(){
			var present	= Date.now()/1000
			if( lastStop >= lastStart ){				// release in-progress or overs
				if(present - lastStop >= releaseDelay) return 0 // release over
				return 1 - (present - lastStop) / releaseDelay	// release inprogress
			}else if( present - lastStart <= attackDelay ){ 	// attack in-progress
				return (present - lastStart) / attackDelay
			}else	return 1;					// sustain in-progress
		}
	}
}


WebAudiox.FlameThrower.baseUrl	= '../'
