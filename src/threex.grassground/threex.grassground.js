var THREEx	= THREEx	|| {}

THREEx.GrassGround	= function(opts){
	// handle default arguments
	opts		= opts	|| {}
	var width	= opts.width !== undefined ? opts.width : 1
	var height	= opts.height !== undefined ? opts.height : 1
	var segmentsW	= opts.segmentsW !== undefined ? opts.segmentsW : 1
	var segmentsH	= opts.segmentsH !== undefined ? opts.segmentsH : 1
	var repeatX	= opts.repeatX !== undefined ? opts.repeatX : 1
	var repeatY	= opts.repeatY !== undefined ? opts.repeatY : 1
	var anisotropy	= opts.anisotropy !== undefined ? opts.anisotropy : 16
	// create the texture	
	var textureUrl	= THREEx.GrassGround.baseUrl + 'images/grasslight-small.jpg'
	var texture	= THREE.ImageUtils.loadTexture(textureUrl);
	texture.wrapS	= THREE.RepeatWrapping;
	texture.wrapT	= THREE.RepeatWrapping;
	texture.repeat.x= repeatX
	texture.repeat.y= repeatY
	texture.anisotropy = anisotropy;


	var geometry	= new THREE.PlaneGeometry(width, height, segmentsW, segmentsH)
	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		color	: 0x44FF44,
	})
	var object3D	= new THREE.Mesh(geometry, material)
	object3D.rotateX(-Math.PI/2)
	
	return object3D;
}

THREEx.GrassGround.baseUrl	= "../"
