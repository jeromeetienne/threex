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