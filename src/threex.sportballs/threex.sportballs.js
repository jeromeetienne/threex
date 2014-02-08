/**
 * declare THREEx namespace
 * @type {[type]}
 */
var THREEx	= THREEx	|| {};

/**
 * THREEx extension
 * 
 * @constructor
 */
THREEx.SportBalls	= {};

THREEx.SportBalls.baseURL	= '../'


THREEx.SportBalls.createBasket	= function(){
	var baseURL	= THREEx.SportBalls.baseURL
	var texture	= THREE.ImageUtils.loadTexture(baseURL + 'images/BasketballColor.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh	
}

THREEx.SportBalls.createBeach	= function(){
	var baseURL	= THREEx.SportBalls.baseURL
	var texture	= THREE.ImageUtils.loadTexture(baseURL + 'images/BeachBallColor.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh	
}

THREEx.SportBalls.createTennis	= function(){
	var baseURL	= THREEx.SportBalls.baseURL
	var textureColor= THREE.ImageUtils.loadTexture(baseURL + 'images/NewTennisBallColor.jpg')
	var textureBump	= THREE.ImageUtils.loadTexture(baseURL + 'images/TennisBallBump.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: textureColor,
		bumpMap	: textureBump,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh	
}

THREEx.SportBalls.createFootball	= function(){
	var baseURL	= THREEx.SportBalls.baseURL
	var texture	= THREE.ImageUtils.loadTexture(baseURL + 'images/Footballballfree.jpg59a2a1dc-64c8-4bc3-83ef-1257c9147fd1Large.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh	
}

THREEx.SportBalls.createSoftball	= function(){
	var baseURL	= THREEx.SportBalls.baseURL
	var textureColor= THREE.ImageUtils.loadTexture(baseURL + 'images/SoftballColor.jpg')
	var textureBump	= THREE.ImageUtils.loadTexture(baseURL + 'images/SoftballBump.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: textureColor,
		bumpMap	: textureBump,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh	
}
