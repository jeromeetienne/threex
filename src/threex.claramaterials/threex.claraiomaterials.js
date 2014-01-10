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

/**
 * return an array of each texture of the material. usefull when 
 * setting .repeat/.warpS/.warpT stuff. for example
 * 
 * THREEx.ClaraioMaterials.textures(material).forEach(function(texture){
 *        texture.wrapS        = THREE.RepeatWrapping;
 *         texture.wrapT        = THREE.RepeatWrapping;
 *         texture.repeat.set(30,30)
 *        texture.anisotropy = 16;         
 * })
 *         
 * @return {[THREE.Texture]}            the array of texture
 */
THREEx.ClaraioMaterials.textures        = function(material){
         var textures        = []
        if( material.map )                textures.push(material.map)        
        if( material.normalMap )        textures.push(material.normalMap)
        if( material.specularMap )        textures.push(material.specularMap)
        if( material.bumpMap )                textures.push(material.bumpMap)
        return textures
}

//////////////////////////////////////////////////////////////////////////////////
//		Fabric								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ClaraioMaterials.createLeather	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#1b1d28',
		shininess	: 19,

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/LeatherColor.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/LeatherNormal.png'),
		normalScale	: new THREE.Vector2(0.6,0.6),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/LeatherSpec.png'),
		specular	: '#0e131c',
	})
	return material	
}

THREEx.ClaraioMaterials.createJean	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#3a3a33',
		shininess	: 19,
		emissive	: '#000000',

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/Jean_COLOR.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/Jean_NRM.png'),
		normalScale	: new THREE.Vector2(2,2),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/Jean_SPEC.png'),
		specular	: '#2d2d2d',
	})
	return material	
}

THREEx.ClaraioMaterials.createBlackLeather	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#000000',
		shininess	: 20,
		emissive	: '#000000',

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/BlackLeather_Color.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/BlackLeather_NRM.png'),
		normalScale	: new THREE.Vector2(0.5,0.5),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/BlackLeather_Spec.png'),
		specular	: '#7a7878',
	})
	return material	
}


//////////////////////////////////////////////////////////////////////////////////
//		Architectural							//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ClaraioMaterials.createStone	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#1e1e1e',
		shininess	: 14,

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/BrickColor.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/BrickNormal.png'),
		normalScale	: new THREE.Vector2(2,2),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/BrickSpec.png'),
		specular	: '#4c4a4a',

	})
	return material	
}

THREEx.ClaraioMaterials.createCobblestone	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#1e1e1e',
		shininess	: 14,

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/CobbleStoneColor.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/CobbleStoneNormal.png'),
		normalScale	: new THREE.Vector2(2,2),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/CobbleStoneSpec.png'),
		specular	: '#4c4a4a',

	})
	return material	
}

//////////////////////////////////////////////////////////////////////////////////
//		Environmental							//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ClaraioMaterials.createLava	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#ffffff',
		shininess	: 15,
		emissive	: '#7e7f54',

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/Lava.jpg'),
		// TODO there is a emissiveMap which seems not present in three.js

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/LavaEmiss.png'),
		specular	: '#a88630',
	})
	return material	
}


THREEx.ClaraioMaterials.createGrass	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#3e5935',
		shininess	: 14*2,
		emissive	: '#000000',

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/Grass_Color.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/Grass_NRM.png'),
		normalScale	: new THREE.Vector2(2,2),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/Grass_Spec.png'),
		specular	: '#1b1c1b',

	})
	return material	
}

THREEx.ClaraioMaterials.createSand	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#424242',

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/WhiteSand_COLOR.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/WhiteSand_NRM.png'),

		specularMap	: THREE.ImageUtils.loadTexture(baseURL+'images/WhiteSand_SPEC.png'),
		specular	: '#35311d',
	})
	return material	
}

//////////////////////////////////////////////////////////////////////////////////
//		Metals								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ClaraioMaterials.createMetal	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		color		: '#888888',
		ambient		: '#444444',
		shininess	: 75,

		reflectivity	: 0.93,
		
		envMap		: THREE.ImageUtils.loadTextureCube([
			baseURL+'images/cubes/swisscastleblur/posx.png',
			baseURL+'images/cubes/swisscastleblur/negx.png',
			baseURL+'images/cubes/swisscastleblur/posy.png',
			baseURL+'images/cubes/swisscastleblur/negy.png',
			baseURL+'images/cubes/swisscastleblur/posz.png',
			baseURL+'images/cubes/swisscastleblur/negz.png',
		])
	})
	return material	
}


THREEx.ClaraioMaterials.createBrushedMetal	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		color		: '#bbbbbb',
		ambient		: '#666666',
		shininess	: 33,


		bumpMap		: THREE.ImageUtils.loadTexture(baseURL+'images/BrushedMetal.png'),
		bumpScale	: 0.001,
		
		reflectivity	: 0.93,
		
		envMap		: THREE.ImageUtils.loadTextureCube([
			baseURL+'images/cubes/swisscastleblur/posx.png',
			baseURL+'images/cubes/swisscastleblur/negx.png',
			baseURL+'images/cubes/swisscastleblur/posy.png',
			baseURL+'images/cubes/swisscastleblur/negy.png',
			baseURL+'images/cubes/swisscastleblur/posz.png',
			baseURL+'images/cubes/swisscastleblur/negz.png',
		])
	})
	return material	
}

//////////////////////////////////////////////////////////////////////////////////
//		Wood								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.ClaraioMaterials.createWood	= function(){
	var baseURL	= THREEx.ClaraioMaterials.baseURL;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: '#261a0c',
		shininess	: 19,

		map		: THREE.ImageUtils.loadTexture(baseURL+'images/AfricanEbonyBoards-ColorMap.png'),

		normalMap	: THREE.ImageUtils.loadTexture(baseURL+'images/AfricanEbonyBoards-NormalMap.png'),
		normalScale	: new THREE.Vector2(2,2),

		specular	: '#261910',
	})
	return material	
}

