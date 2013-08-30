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
THREEx.ClaraioMaterials	= {};

THREEx.ClaraioMaterials.baseURL	= '../'

THREEx.ClaraioMaterials.createWhiteSand	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#424242',
		map		: THREE.ImageUtils.loadTexture(baseURL+'images/WhiteSand_COLOR.png'),
		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/WhiteSand_NRM.png'),
		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/WhiteSand_SPEC.png'),
		specular	: '#35311d',
	});
	return material	
}

THREEx.ClaraioMaterials.createLeather	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#3a3a33',
		shininess	: 19,
		map		: THREE.ImageUtils.loadTexture(baseURL+'images/LeatherColor.png'),
		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/LeatherNormal.png'),
		normalScale	: new THREE.Vector2(0.6,0.6),
		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/LeatherSpec.png'),
		specular	: '#2d2d2d',
	});
	return material	
}

THREEx.ClaraioMaterials.createLava	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: 'white',
		shininess	: 15,
		emissive	: '#7e7f54',
		map		: THREE.ImageUtils.loadTexture(baseURL+'images/Lava.jpg'),
		// TODO there is a emissiveMap which seems not present in three.js
		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/LavaEmiss.png'),
		specular	: '#a88630',
	});
	return material	
}

THREEx.ClaraioMaterials.createBrushedMetal	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		color		: '#ffffff',
		ambient		: '#666666',
		shininess	: 33,
		emissive	: '#000000',
		bumpMap		: THREE.ImageUtils.loadTexture(baseURL+'images/BrushedMetal.png'),
		bumpScale	: 0.001,
		specular	: '#ffffff',
	});
	return material	
}


