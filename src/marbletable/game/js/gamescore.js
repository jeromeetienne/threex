var GameScore	= function(){
	var domElement	= document.querySelector('#score')
	var score	= 0

	yeller.addEventListener('increaseScore', function(amount){
		score	+= amount		
		domElement.innerHTML	= stringPadder(score, 5, '0')
	})	

	yeller.dispatchEvent('increaseScore', 0)

	function stringPadder(value, width, padChar){
		var maxPadded	= Array(width+1).join(padChar) + value;
		return maxPadded.substr(maxPadded.length-width);
	}
}
