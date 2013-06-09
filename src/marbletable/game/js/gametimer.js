var GameTimer	= function(){
	// display timer
	this.timerBegin	= Date.now();
	this.timerEnd	= null;
	this.update	= function(delta, now){
		if( this.timerEnd === null ){
			var deltaTime	= Date.now() - this.timerBegin
		}else{
			var deltaTime	= this.timerEnd - this.timerBegin			
		}
		var nMilliSecs	= Math.round(deltaTime) % 1000;
		var nSeconds	= Math.round(deltaTime / 1000) % 60;
		var nMinutes	= Math.round(deltaTime / (60*1000))
		
		var stringPadder= function(value, width, padChar){
			var maxPadded	= Array(width+1).join(padChar) + value;
			return maxPadded.substr(maxPadded.length-width);
		}
		var element	= document.querySelector('#timer');
		element.innerText= stringPadder(nMinutes, 2, '0')
					+ ':'
					+ stringPadder(nSeconds, 2, '0')
					+ ':'
					+ stringPadder(nMilliSecs, 3, '0');
	}
}
