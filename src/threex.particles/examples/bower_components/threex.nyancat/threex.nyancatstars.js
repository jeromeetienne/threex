var THREEx	= THREEx || {};

/**
 * from original webgl anonymous demo 
 */
THREEx.NyanCatStars	= function(){
	var container	= new THREE.Object3D()
	this.container	= container
	var numStars	= 10
	this.numStars	= numStars

	var stars	= new Array();
	this.stars	= stars
	for(var state=0;state<6;state++){
		stars.push(new Array());
		for(var c=0;c<numStars;c++){
			var star = new THREE.Object3D();
			star.position.x=Math.random() * 200 - 100;
			star.position.y=Math.random() * 200 - 100;
			star.position.z=Math.random() * 200 - 100;
			buildStar(star, state);
			container.add( star );
			stars[state].push(star);
		}
	}

	function buildStar(star, state) {
		switch(state){
			case 0:
				helper( star, 0, 0, 0, 1, 1, 1, 0xffffff);
				break;
			case 1:
				helper( star, 1, 0, 0, 1, 1, 1, 0xffffff);
				helper( star,-1, 0, 0, 1, 1, 1, 0xffffff);
				helper( star, 0, 1, 0, 1, 1, 1, 0xffffff);
				helper( star, 0,-1, 0, 1, 1, 1, 0xffffff);
				break;
			case 2:
				helper( star, 1, 0, 0, 2, 1, 1, 0xffffff);
				helper( star,-2, 0, 0, 2, 1, 1, 0xffffff);
				helper( star, 0, 2, 0, 1, 2, 1, 0xffffff);
				helper( star, 0,-1, 0, 1, 2, 1, 0xffffff);
				break;
			case 3:
				helper( star, 0, 0, 0, 1, 1, 1, 0xffffff);
				helper( star, 2, 0, 0, 2, 1, 1, 0xffffff);
				helper( star,-3, 0, 0, 2, 1, 1, 0xffffff);
				helper( star, 0, 3, 0, 1, 2, 1, 0xffffff);
				helper( star, 0,-2, 0, 1, 2, 1, 0xffffff);
				break;
			case 4:
				helper( star, 0, 3, 0, 1, 1, 1, 0xffffff);
				helper( star, 2, 2, 0, 1, 1, 1, 0xffffff);
				helper( star, 3, 0, 0, 1, 1, 1, 0xffffff);
				helper( star, 2,-2, 0, 1, 1, 1, 0xffffff);
				helper( star, 0,-3, 0, 1, 1, 1, 0xffffff);
				helper( star,-2,-2, 0, 1, 1, 1, 0xffffff);
				helper( star,-3, 0, 0, 1, 1, 1, 0xffffff);
				helper( star,-2, 2, 0, 1, 1, 1, 0xffffff);
				break;
			case 5:
				helper( star, 2, 0, 0, 1, 1, 1, 0xffffff);
				helper( star,-2, 0, 0, 1, 1, 1, 0xffffff);
				helper( star, 0, 2, 0, 1, 1, 1, 0xffffff);
				helper( star, 0,-2, 0, 1, 1, 1, 0xffffff);
				break;
		}
	}
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


THREEx.NyanCatStars.prototype.update = function(delta, now){
	var numStars	= this.numStars
	// compute the frameIdx for present time
	var nFrames	= 6
	var animSpeed	= 7
	var past	= now - delta;
	var frameIdxOld	= Math.floor((past*animSpeed) % nFrames)
	var frameIdxNow	= Math.floor((now *animSpeed) % nFrames)
	// if it is the same as last time, do nothing
	if( frameIdxNow === frameIdxOld )	return;
	// else move the object
	var stars	= this.stars
	for(var c = 0;c < numStars ;c++){
		var tempX	= stars[5][c].position.x
		var tempY	= stars[5][c].position.y
		var tempZ	= stars[5][c].position.z

		for(var state=5;state>0;state--){
			var star	= stars[state  ][c];
			var star2	= stars[state-1][c];

			star.position.x	= star2.position.x-8;
			star.position.y	= star2.position.y;
			star.position.z	= star2.position.z;
			
			if( star.position.x < -100 ){
				star.position.x+=200;
				star.position.y = Math.random() * 200 - 100;
				star.position.z = Math.random() * 200 - 100;
			}
		}
		stars[0][c].position.x=tempX;
		stars[0][c].position.y=tempY;
		stars[0][c].position.z=tempZ;
	}
}
