var THREEx	= THREEx || {};

/**
 * from original webgl anonymous demo 
 */
THREEx.NyanCatSound	= function(){
	var songPaused	= document.createElement('audio');
	this.songPaused	= songPaused
	songPaused.setAttribute('src', '../sounds/nyanslow.mp3');
	songPaused.setAttribute('loop', 'true');

	var songRunning	= document.createElement('audio')
	this.songRunning= songRunning
	songRunning.setAttribute('src', '../sounds/nyanlooped.mp3');
	songRunning.setAttribute('loop', 'true');
	songRunning.play();

	var running	= true
	this.toggle	= function(){
		running	= running ? false : true;
		if(running){
			songRunning.play();
			songPaused.pause();
		}else{
			songRunning.pause();
			songPaused.play();
		}
	}.bind(this);
}