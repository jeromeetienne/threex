var THREEx = THREEx || {}


THREEx.AudioVideoTexture	= function(context, url, onSoundReady){
	// default values for arguments
	onSoundReady	= onSoundReady || function(){}
	// create the video element
	var video	= document.createElement('video');
	video.width	= 320;
	video.height	= 240;
	video.autoplay	= true;
	video.loop	= true;
	video.src	= url;
	// expose video as this.video
	this.video	= video

	// wait until the vid is loaded
	video.addEventListener('canplaythrough', function(event){
		var sourceNode	= context.createMediaElementSource(video);
		// trigger the event
		onSoundReady(sourceNode)
	})

	// create the texture
	var texture	= new THREE.Texture( video );
	// expose texture as this.texture
	this.texture	= texture

	/**
	 * update the object
	 */
	this.update	= function(){
		if( video.readyState !== video.HAVE_ENOUGH_DATA )	return;
		texture.needsUpdate	= true;		
	}

	/**
	 * destroy the object
	 */
	this.destroy	= function(){
		video.pause()
	}
}