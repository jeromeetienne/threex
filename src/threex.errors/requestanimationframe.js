function overloadRequestAnimationFrame(fps){
	window.requestAnimationFrame	= function(callback){
		setTimeout(function(){
			callback(Date.now())
		}, 1000 * 1/fps)
	}
}
