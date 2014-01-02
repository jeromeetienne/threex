/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.BadTVSound	= function(context, destination){
	var url		= THREEx.BadTVSound.baseUrl + 'sounds/132834__bekir-virtualdj__electric.mp3'
	var buffer	= null
	loadSoundWebAudio(url, function(decodedBuffer){
		buffer	= decodedBuffer
	});
		
	this.isReady	= function(){
		return buffer === null ? false : true
	}
	this.play	= function(){
		if( !buffer )	return;
		// BufferSource
		var source	= context.createBufferSource();
		source.buffer	= buffer;
		source.connect(destination);
		source.start(0)
		return source
	}


	function loadSoundWebAudio(url, onLoad, onError){
		onLoad	= onLoad	|| function(){}
		onError	= onError	|| function(){}
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			context.decodeAudioData(request.response, onLoad, onError);
		}
		request.send();
	}
}

THREEx.BadTVSound.baseUrl	= '../'