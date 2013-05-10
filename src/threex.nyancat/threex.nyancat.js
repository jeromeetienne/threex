var THREEx	= THREEx || {};

/**
 * from original webgl anonymous demo 
 */
THREEx.NyanCat	= function(){
	var container	= new THREE.Object3D()
	this.container	= container
	//POPTART
	var poptart	= new THREE.Object3D();
	this.poptart	= poptart
	//		object	   x    y    z    w    h    d	  color
	helper(	poptart,   0,  -2,  -1,  21,  14,   3, 0x222222);
	helper(	poptart,   1,  -1,  -1,  19,  16,   3, 0x222222);
	helper(	poptart,   2,   0,  -1,  17,  18,   3, 0x222222);
	
	helper(	poptart,   1,  -2,-1.5,  19,  14,   4, 0xffcc99);
	helper(	poptart,   2,  -1,-1.5,  17,  16,   4, 0xffcc99);
	
	helper(	poptart,   2,  -4,   2,  17,  10,  .6, 0xff99ff);
	helper(	poptart,   3,  -3,   2,  15,  12,  .6, 0xff99ff);
	helper(	poptart,   4,  -2,   2,  13,  14,  .6, 0xff99ff);
	
	helper(	poptart,   4,  -4,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   9,  -3,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,  12,  -3,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,  16,  -5,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   8,  -7,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   5,  -9,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   9, -10,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   3, -11,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   7, -13,   2,   1,   1,  .7, 0xff3399);
	helper(	poptart,   4, -14,   2,   1,   1,  .7, 0xff3399);
	
	poptart.position.x=-10.5;
	poptart.position.y=9;
	container.add( poptart );
	
	//FEET
	var feet	= new THREE.Object3D();
	this.feet	= feet
	helper(	feet,   0,  -2, .49,  3,  3,   1, 0x222222);
	helper(	feet,   1,  -1, .49,  3,  3,   1, 0x222222);
	helper(	feet,   1,  -2,-.01,  2,  2,   2, 0x999999);
	helper(	feet,   2,  -1,-.01,  2,  2,   2, 0x999999);
	
	helper(	feet,   6,  -2, -.5,  3,  3,   1, 0x222222);
	helper(	feet,   6,  -2, -.5,  4,  2,   1, 0x222222);
	helper(	feet,   7,  -2,-.99,  2,  2,   2, 0x999999);
	
	helper(	feet,   16, -3, .49,  3,  2,   1, 0x222222);
	helper(	feet,   15, -2, .49,  3,  2,   1, 0x222222);
	helper(	feet,   15, -2,-.01,  2,  1,   2, 0x999999);
	helper(	feet,   16, -3,-.01,  2,  1,   2, 0x999999);
	
	helper(	feet,   21, -3, -.5,  3,  2,   1, 0x222222);
	helper(	feet,   20, -2, -.5,  3,  2,   1, 0x222222);
	helper(	feet,   20, -2,-.99,  2,  1,   2, 0x999999);
	helper(	feet,   21, -3,-.99,  2,  1,   2, 0x999999);
	
	feet.position.x=-12.5;
	feet.position.y=-6;
	container.add( feet );
	
	//TAIL
	var tail	= new THREE.Object3D();
	this.tail	= tail
	helper(	tail,   0,  0,-.25,  4,  3, 1.5, 0x222222);
	helper(	tail,   1, -1,-.25,  4,  3, 1.5, 0x222222);
	helper(	tail,   2, -2,-.25,  4,  3, 1.5, 0x222222);
	helper(	tail,   3, -3,-.25,  4,  3, 1.5, 0x222222);
	helper(	tail,   1, -1, -.5,  2,  1,   2, 0x999999);
	helper(	tail,   2, -2, -.5,  2,  1,   2, 0x999999);
	helper(	tail,   3, -3, -.5,  2,  1,   2, 0x999999);
	helper(	tail,   4, -4, -.5,  2,  1,   2, 0x999999);
	
	tail.position.x=-16.5;
	tail.position.y=2;
	container.add( tail );
	
	//FACE
	var face	= new THREE.Object3D();
	this.face	= face;
	helper(	   face,   2,  -3,  -3,  12,   9,   4, 0x222222);
	helper(	   face,   0,  -5,   0,  16,   5,   1, 0x222222);
	helper(	   face,   1,  -1,   0,   4,  10,   1, 0x222222);
	helper(	   face,  11,  -1,   0,   4,  10,   1, 0x222222);
	helper(	   face,   3, -11,   0,  10,   2,   1, 0x222222);
	helper(	   face,   2,   0,   0,   2,   2,   1, 0x222222);
	helper(	   face,   4,  -2,   0,   2,   2,   1, 0x222222);
	helper(	   face,  12,   0,   0,   2,   2,   1, 0x222222);
	helper(	   face,  10,  -2,   0,   2,   2,   1, 0x222222);
	
	helper(	   face,   1, -5,   .5,  14,   5,   1, 0x999999);
	helper(	   face,   3, -4,   .5,  10,   8,   1, 0x999999);
	helper(	   face,   2, -1,   .5,   2,  10,   1, 0x999999);
	helper(	   face,  12, -1,   .5,   2,  10,   1, 0x999999);
	helper(	   face,   4, -2,   .5,   1,   2,   1, 0x999999);
	helper(	   face,   5, -3,   .5,   1,   1,   1, 0x999999);
	helper(	   face,  11, -2,   .5,   1,   2,   1, 0x999999);
	helper(	   face,  10, -3,   .5,   1,   1,   1, 0x999999);
	//Eyes
	helper(	   face,   4,  -6,  .6,   2,   2,   1, 0x222222);
	helper(	   face,  11,  -6,  .6,   2,   2,   1, 0x222222);
	helper(	   face,3.99,-5.99, .6,1.01,1.01,1.01, 0xffffff);
	helper(	  face,10.99,-5.99, .6,1.01,1.01,1.01, 0xffffff);
	//MOUTH
	helper(	   face,   5, -10,  .6,   7,   1,   1, 0x222222);
	helper(	   face,   5,  -9,  .6,   1,   2,   1, 0x222222);
	helper(	   face,   8,  -9,  .6,   1,   2,   1, 0x222222);
	helper(	   face,  11,  -9,  .6,   1,   2,   1, 0x222222);
	//CHEEKS
	helper(	   face,   2,  -8,  .6,   2,   2, .91, 0xff9999);
	helper(	   face,  13,  -8,  .6,   2,   2, .91, 0xff9999);
	
	face.position.x=-.5;
	face.position.y=4;
	face.position.z=4;
	container.add(face);
	return;
	
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

THREEx.NyanCat.prototype.update = function(delta, now){
	var past	= now - delta;
	// compute the frameIdx for present time
	var nFrames	= 12
	var animSpeed	= 10
	var frameIdxOld	= Math.floor((past*animSpeed) % nFrames)
	var frameIdxNow	= Math.floor((now *animSpeed) % nFrames)
	// if it is the same as last time, do nothing
	if( frameIdxNow === frameIdxOld )	return;
	// else move the object
	switch(frameIdxNow){
		case 0://2nd frame
			this.face.position.x++;
			this.feet.position.x++;
			break;
		case 1:
			this.face.position.y--;
			this.feet.position.x++;
			this.feet.position.y--;
			this.poptart.position.y--;
			break;
		case 2:
			this.feet.position.x--;
			break;
		case 3:
			this.face.position.x--;
			this.feet.position.x--;
			break;
		case 4:
			this.face.position.y++;
			break;
		case 5:
			this.poptart.position.y++;
			this.feet.position.y++;
			break;
		case 6://8th frame
			this.face.position.x++;
			this.feet.position.x++;
			break;
		case 7:
			this.poptart.position.y--;
			this.face.position.y--;
			this.feet.position.x++;
			this.feet.position.y--;
			break;
		case 8:
			this.feet.position.x--;
			break;
		case 9:
			this.face.position.x--;
			this.feet.position.x--;
			break;
		case 10:
			this.face.position.y++;
			break;
		case 11://1st frame
			this.poptart.position.y++;
			this.feet.position.y++;
			break;
	}
}
