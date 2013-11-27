var THREEx	= THREEx || {};

/**
 * from original webgl anonymous demo 
 */
THREEx.NyanCatRainbow	= function(){
	var container	= new THREE.Object3D()
	this.container	= container

	var numRainChunks=30;	
	//RAINBOW
	var rainbow	= new THREE.Object3D();
	this.rainbow	= rainbow

	for(var c=0;c<numRainChunks-1;c++){
		var yOffset=8;
		if(c%2==1) yOffset=7;
		var xOffset=(-c*8)-16.5;
		helper( rainbow,xOffset,yOffset,    0, 8, 3, 1, 0xff0000);
		helper( rainbow,xOffset,yOffset-3,  0, 8, 3, 1, 0xff9900);
		helper( rainbow,xOffset,yOffset-6,  0, 8, 3, 1, 0xffff00);
		helper( rainbow,xOffset,yOffset-9,  0, 8, 3, 1, 0x33ff00);
		helper( rainbow,xOffset,yOffset-12, 0, 8, 3, 1, 0x0099ff);
		helper( rainbow,xOffset,yOffset-15, 0, 8, 3, 1, 0x6633ff);
	}
	container.add( rainbow );
	
	var rainChunk	= new THREE.Object3D();
	this.rainChunk	= rainChunk
	helper( rainChunk, -16.5,  7,  0, 8,  3,   1, 0xff0000);
	helper( rainChunk, -16.5,  4,  0, 8,  3,   1, 0xff9900);
	helper( rainChunk, -16.5,  1,  0, 8,  3,   1, 0xffff00);
	helper( rainChunk, -16.5, -2,  0, 8,  3,   1, 0x33ff00);
	helper( rainChunk, -16.5, -5,  0, 8,  3,   1, 0x0099ff);
	helper( rainChunk, -16.5, -8,  0, 8,  3,   1, 0x6633ff);
	rainChunk.position.x-=(8*(numRainChunks-1));
	container.add( rainChunk );
	return

	function helper(o, x, y, z, w, h, d, c){
		var material = new THREE.MeshLambertMaterial( { color: c} );
		var geometry = new THREE.CubeGeometry(w, h, d, 1, 1, 1);
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x=x+(w/2);
		mesh.position.y=y-(h/2);
		mesh.position.z=z+(d/2);
		o.add( mesh );
	}
}


THREEx.NyanCatRainbow.prototype.update = function(delta, now){
	var past	= now - delta;
	// compute the frameIdx for present time
	var nFrames	= 12
	var animSpeed	= 10
	var frameIdxOld	= Math.floor((past*animSpeed) % nFrames)
	var frameIdxNow	= Math.floor((now *animSpeed) % nFrames)
	// if it is the same as last time, do nothing
	if( frameIdxNow === frameIdxOld )	return;
	// else move the object
	var numRainChunks=30;
	switch(frameIdxNow){
		case 1:
			this.rainbow.position.x-=9;
			this.rainChunk.position.x+=(8*(numRainChunks-1))-1;
			break;
		case 3:
			this.rainbow.position.x+=9;
			this.rainChunk.position.x-=(8*(numRainChunks-1))-1;
			break;
		case 5:
			this.rainbow.position.x-=9;
			this.rainChunk.position.x+=(8*(numRainChunks-1))-1;
			break;
		case 7:
			this.rainbow.position.x+=9;
			this.rainChunk.position.x-=(8*(numRainChunks-1))-1;
			break;
		case 9:
			this.rainbow.position.x-=9;
			this.rainChunk.position.x+=(8*(numRainChunks-1))-1;
			break;
		case 11://1st frame
			this.rainbow.position.x+=9;
			this.rainChunk.position.x-=(8*(numRainChunks-1))-1;
			break;
	}
}
