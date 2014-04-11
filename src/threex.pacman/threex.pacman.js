var THREEx	= THREEx	|| {}

THREEx.Pacman	= function(opts){
	opts	= opts	|| {}
	if( opts === 'pacman' )	opts	= {};
	if( opts === 'eyes')	opts	= {
		face	: 'pupil',
		shape	: 'eyes',
		text	: '',
		color	: '#ffffff'
	}
	if( opts === 'ghost' )	opts	= {
		shape	: 'ghost',
		text	: 'El jeje',
	}
	// handle default options
	opts.shape	= opts.shape !== undefined ? opts.shape	: 'pacman'
	opts.face	= opts.face !== undefined ? opts.face	: 'happy'
	opts.color	= opts.color !== undefined ? opts.color	: '#ffff00'
	opts.text	= opts.text !== undefined ? opts.text	: 'pucky'
	opts.fontSize	= opts.fontSize !== undefined ? opts.fontSize	: '40pt'
	opts.shadow	= opts.shadow !== undefined ? opts.shadow	: true
	opts.canvasW	= opts.canvasW !== undefined ? opts.canvasW	: 512

	// sanity check on parameters
	console.assert( THREEx.Pacman.shapes.indexOf(opts.shape) !== -1 );
	console.assert( THREEx.Pacman.faces.indexOf(opts.face) !== -1 );
	// create the texture	
	var texture	= THREEx.Pacman.createTexture(opts.canvasW);
	var canvas	= texture.image;
	// draw the background
	THREEx.Pacman.drawBackground(canvas, opts.color)

	// draw faces
	THREEx.Pacman.drawFace(canvas, opts.face)

	// draw text on back if needed
	if( opts.text ){	
		THREEx.Pacman.drawTextOnBack(canvas, opts.text, opts.fontSize)
	}
	
	var container	= new THREE.Object3D;

	// to get the shape
	if( opts.shape === 'pacman' ){
		var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
		var material	= new THREE.MeshPhongMaterial({
			map	: texture
		})
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.y += 0.5
		container.add(mesh)
	}else if( opts.shape === 'ghost' ){
		// move the ball a little up
		var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
		var material	= new THREE.MeshPhongMaterial({
			map	: texture
		})
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.y = 0.25 + 0.125 + 0.5
		container.add(mesh)
		// build the robe
		var geometry	= new THREE.CylinderGeometry(0.49, 0.5, 0.75, 16)
		var material	= new THREE.MeshLambertMaterial({
			color	: opts.color,
		})
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.y = 0.5
		container.add(mesh)
	}else if( opts.shape === 'eyes' ){
		var geometry	= new THREE.SphereGeometry(0.125, 32, 32)
		var material	= new THREE.MeshPhongMaterial({
			map	: texture
		})
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.x = +0.25
		mesh.position.y = 0.25 + 0.125 + 0.5
		container.add(mesh)
		// eyeL
		var geometry	= new THREE.SphereGeometry(0.125, 32, 32)
		var material	= new THREE.MeshPhongMaterial({
			map	: texture
		})
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.x = -0.25
		mesh.position.y = 0.25 + 0.125 + 0.5
		container.add(mesh)
	}else	console.assert(false);
			
	// add the shadow on the ground
	if( opts.shadow ){
		var texture	= THREEx.Pacman.createTexture();
		var canvas	= texture.image;
		THREEx.Pacman.drawShaddow(canvas)
		var geometry	= new THREE.PlaneGeometry(1,1)
		var material	= new THREE.MeshLambertMaterial({
			map		: texture,
			opacity		: 0.5,
			transparent	: true,
		})
		var mesh	= new THREE.Mesh(geometry, material)
		mesh.lookAt(new THREE.Vector3(0,1,0))
		container.add(mesh)
	}
	// return the contained
	return container;
}


THREEx.Pacman.shapes	= ['pacman', 'ghost', 'eyes']
THREEx.Pacman.faces	= ['happy', 'hurt', 'angry', 'pupil']

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////
	

/**
 * initialize the texture
 * @param  {Number|undefined} canvasW the width of the canvas. default to 512
 * @return {THREE.Texture}        the just created texture
 */
THREEx.Pacman.createTexture	= function(canvasW){
	canvasW		= typeof canvasW !== 'undefined' ? canvasW : 512;
	// create the canvas
	var canvas	= document.createElement('canvas');
	canvas.width	= canvas.height	= canvasW;
	// create the texture
	var texture	= new THREE.Texture(canvas);
	texture.needsUpdate	= true;
	// return the texture
	return texture;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Pacman.drawFace = function(canvas, face){
	if( face === 'happy' ){
		THREEx.Pacman.drawFaceHappy(canvas)
	}else if( face === 'hurt' ){
		THREEx.Pacman.drawFaceHurt(canvas)
	}else if( face === 'angry' ){
		THREEx.Pacman.drawFaceAngry(canvas)
	}else if( face === 'pupil' ){
		THREEx.Pacman.drawFacePupil(canvas)
	}else	console.assert(false);
};

/**
 * display an happy smiley on a canvas for texture
 *
 * @param {canvasElement} the canvas where we draw
*/
THREEx.Pacman.drawFaceHappy = function(canvas){
	var w		= canvas.width;
	var ctx		= canvas.getContext( '2d' );
	var xtx		= THREEx.Pacman.xCanvas.create(ctx);

	
	var eyeDx	= w/16;
	var eyeDy	= w/12;

	var eyeW	= w/16;
	var eyeH	= w/6;
	
	var mouthW	= w/12;
	var mouthDy	= w/12;
	var mouthRbeg	= 0;
	var mouthRend	= 180 * Math.PI / 180;
		
	ctx.fillStyle = "rgb(0,0,0)";
	
	// right eyes
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	xtx.fillEllipse(eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
	ctx.restore();

	// left eyes
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	xtx.fillEllipse(- eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
	ctx.restore();

	// right part of the mouth
	ctx.save();
	ctx.beginPath();
	ctx.translate(w/2 - w/4, w/2);
	ctx.arc(0, mouthDy, mouthW, mouthRbeg, mouthRend, false)
	ctx.fill();
	ctx.restore();	
}

/**
 * display an hurt smiley on a canvas for texture
 * @param {canvasElement} the canvas where we draw
*/
THREEx.Pacman.drawFaceHurt = function(canvas){
	var w		= canvas.width;
	var ctx		= canvas.getContext( '2d' );

	var eyeDx	= w/16;
	var eyeDy	= w/12;

	var eyeW	= w/24;
	var eyeH	= w/9;

	var mouthW	= w/12;
	var mouthDx	= 0;
	var mouthDy	= w/12;

	ctx.fillStyle	= "#000000";
	ctx.lineCap	= "round";
	ctx.lineWidth	= w/48;

	// right eyes
	ctx.save();
	ctx.beginPath();
	ctx.translate(w/2 - w/4, w/2);
	ctx.translate(eyeDx, -eyeDy);
	ctx.moveTo(-eyeW/2, -eyeH/2);
	ctx.lineTo(+eyeW/2, +eyeH/2);
	ctx.stroke();		
	ctx.moveTo(+eyeW/2, -eyeH/2);
	ctx.lineTo(-eyeW/2, +eyeH/2);
	ctx.stroke();
	ctx.restore();

	// left eyes
	ctx.save();
	ctx.beginPath();
	ctx.translate(w/2 - w/4, w/2);
	ctx.translate(-eyeDx, -eyeDy);
	ctx.moveTo(-eyeW/2, -eyeH/2);
	ctx.lineTo(+eyeW/2, +eyeH/2);
	ctx.stroke();				
	ctx.moveTo(+eyeW/2, -eyeH/2);
	ctx.lineTo(-eyeW/2, +eyeH/2);
	ctx.stroke();
	ctx.restore();


	ctx.lineWidth	= w/32;

	// mouth flat (rigth)
	ctx.save();
	ctx.beginPath();
	ctx.translate(w/2 - w/4, w/2);
	ctx.translate(+mouthDx, +mouthDy);
	ctx.moveTo(-mouthW/2, 0);
	ctx.lineTo(+mouthW/2, 0);
	ctx.stroke();
	ctx.restore();
}

/**
 * display an hurt smiley on a canvas for texture
 * @param {canvasElement} the canvas where we draw
*/
THREEx.Pacman.drawFaceAngry = function(canvas){
	var w		= canvas.width;
	var ctx		= canvas.getContext( '2d' );
	var xtx		= THREEx.Pacman.xCanvas.create(ctx);
	
	var eyeDx	= w/16;
	var eyeDy	= w/10;

	var eyeW	= w/12;
	var eyeH	= w/10;
	
	var mouthW	= w/12;
	var mouthDy	= w/10;
	var mouthRbeg	= 180 * Math.PI / 180;
	var mouthRend	= 0;
		
	ctx.fillStyle = "rgb(0,0,0)";
	
	var eyeBrowW	= w/6;
	var eyeBrowH	= w/20;
	var eyeBrowDx	= w/16;
	var eyeBrowDy	= w/5;
	var eyeBrowRot	= 30*Math.PI/180;
	
	// right eyebrow
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	ctx.translate(eyeBrowDx, -eyeBrowDy);
	ctx.rotate(-eyeBrowRot)
	ctx.fillRect( -eyeBrowW/2, -eyeBrowH/2, eyeBrowW, eyeBrowH);
	ctx.restore();

	//// right eyes
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	xtx.fillEllipse(eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
	ctx.restore();

	// left eyebrow
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	ctx.translate(-eyeBrowDx, -eyeBrowDy);
	ctx.rotate(+eyeBrowRot)
	ctx.fillRect( -eyeBrowW/2, -eyeBrowH/2, eyeBrowW, eyeBrowH);
	ctx.restore();

	// left eyes
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	xtx.fillEllipse(- eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
	ctx.restore();
	
	// the mouth
	ctx.save();
	ctx.beginPath();
	ctx.translate(w/2 - w/4, w/2);
	ctx.arc(0, mouthDy, mouthW, mouthRbeg, mouthRend, false)
	ctx.fill();
	ctx.restore();	
}


/**
 * display an happy smiley on a canvas for texture
 *
 * @param {canvasElement} the canvas where we draw
*/
THREEx.Pacman.drawFacePupil = function(canvas){
	var w		= canvas.width;
	var ctx		= canvas.getContext( '2d' );
	var xtx		= THREEx.Pacman.xCanvas.create(ctx);
	
	var eyeDx	= 0;
	var eyeDy	= 0;

	var eyeW	= w/12;
	var eyeH	= w/3;
	
	ctx.fillStyle	= "#000000";
	
	// pupil 
	ctx.save();
	ctx.translate(w/2 - w/4, w/2);
	xtx.fillEllipse(eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
	ctx.restore();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Pacman.drawBackground = function(canvas, color){
	var ctx		= canvas.getContext( '2d' );
	ctx.fillStyle	= color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/**
 * display the shadow of the smiley in a texture
 *
 * @param {canvasElement} the canvas where we draw
*/
THREEx.Pacman.drawShaddow = function(canvas, color){
	var w		= canvas.width;
	var ctx		= canvas.getContext( '2d' );
	var xtx		= THREEx.Pacman.xCanvas.create(ctx);

	
	ctx.fillStyle	= "rgba(127,127,127,0.5)";

	var circleW	= 8*w/8;
	var circleH	= 8*w/8;
	
	ctx.save();
	ctx.translate(w/2 , w/2);
	xtx.fillEllipse(-circleW/2, -circleH/2, circleW, circleH);
	ctx.restore();
};

/**
 * display the shadow of the smiley in a texture
 *
 * @param {canvasElement} the canvas where we draw
*/
THREEx.Pacman.drawTextOnBack	= function(canvas, textData, fontSize){
	var w		= canvas.width;
	var ctx		= canvas.getContext( '2d' );
	
	ctx.fillStyle	= "#000000";
	
	ctx.save();
	ctx.translate(+3*w/4, w/2-w/32)
	ctx.font	= "bolder "+fontSize+" Arial";
	var textW	= ctx.measureText(textData).width;
	ctx.strokeStyle	= "rgb(0,0,0,0)";
	//console.log("measutreText", ctx.measureText(textData));
	ctx.fillText(textData, -textW/2, 0);
	ctx.restore();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////
	
/**
 * helper for the canvas2d API to draw circle and ellipse
 * @type {Object}
 */
THREEx.Pacman.xCanvas	= {
	create	: function(ctx){
		var xCanvas	= THREEx.Pacman.xCanvas;
		return {
			fillEllipse	: function(aX, aY, aWidth, aHeight){
				return xCanvas.fillEllipse(ctx, aX, aY, aWidth, aHeight)
			}
		}
	},
	// Andrea Giammarchi - Mit Style License
	// Circle methods
	circle		: function(ctx, aX, aY, aDiameter){
		this.ellipse(ctx, aX, aY, aDiameter, aDiameter);
	},
	fillCircle	: function(ctx, aX, aY, aDiameter){
		ctx.beginPath();
		this.circle(ctx, aX, aY, aDiameter);
		ctx.fill();
	},
	strokeCircle	: function(ctx, aX, aY, aDiameter){
		ctx.beginPath();
		this.circle(ctx, aX, aY, aDiameter);
		ctx.stroke();
	},
	// Ellipse methods
	ellipse		: function(ctx, aX, aY, aWidth, aHeight){
		var hB = (aWidth / 2) * .5522848,
		vB = (aHeight / 2) * .5522848,
		eX = aX + aWidth,
		eY = aY + aHeight,
		mX = aX + aWidth / 2,
		mY = aY + aHeight / 2;
		ctx.moveTo(aX, mY);
		ctx.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
		ctx.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
		ctx.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
		ctx.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
		ctx.closePath();
	},
	fillEllipse	: function(ctx, aX, aY, aWidth, aHeight){
		ctx.beginPath();
		this.ellipse(ctx, aX, aY, aWidth, aHeight);
		ctx.fill();
	},
	strokeEllipse:function(ctx, aX, aY, aWidth, aHeight){
		ctx.beginPath();
		this.ellipse(ctx, aX, aY, aWidth, aHeight);
		ctx.stroke();
	}
};
