var GameScore	= function(){
	var _score	= 0

	yeller.addEventListener('increaseScore', function(amount){
		_score	+= amount
		this.update();
	}.bind(this))

	this.score	= function(value){
		if( value === undefined )	return _score
		_score	= value;
		this.update();
	}

	var domElement	= document.querySelector('#score')
	this.update	= function(){
		domElement.innerHTML	= stringPadder(_score, 5, '0')
		sounds.playScoreup()		

		function stringPadder(value, width, padChar){
			var maxPadded	= Array(width+1).join(padChar) + value;
			return maxPadded.substr(maxPadded.length-width);
		}
	}

	this.score(0)
}