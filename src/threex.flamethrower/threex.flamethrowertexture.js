var THREEx	= THREEx	|| {}


THREEx.FlameThrowerTexture	= function(onReady){
	var texture	= new THREE.Texture();	
	// build the final url with baseUrl
	var urls	= []
	THREEx.FlameThrowerTexture.imageUrls.forEach(function(imageUrl){
		var url	= THREEx.FlameThrowerTexture.baseUrl + imageUrl
		urls.push(url)
	})
	// load all the images from urls
	THREEx.TextureUtils.loadImages(urls, function(images, urls){
		// build a tiled spreadsheet canvas with images
		var canvas	= THREEx.TextureUtils.buildTiledSpriteSheet({
			images	: images,
			spriteW	: images[0].width,
			spriteH	: images[0].height,
			nSpriteX: 1
		})
		// create the texture
		texture.image		= canvas
		texture.needsUpdate	= true
		// generate Alpha as it got no alpha
		THREEx.TextureUtils.generateAlphaFromLuminance(texture, 16, 1)
		// notify caller
		onReady(texture)
	})
	return texture
}


THREEx.FlameThrowerTexture.baseUrl	= '../'

THREEx.FlameThrowerTexture.imageUrls	= [
	'images/flame00.png',
	'images/flame01.png',
	'images/flame02.png',
	'images/flame03.png',
	'images/flame04.png',
	'images/flame05.png',
	'images/flame06.png',
	'images/flame07.png',
	'images/flame08.png',
	'images/flame09.png',
	'images/flame10.png',
	'images/flame11.png',
	'images/flame12.png',
	'images/flame13.png',
	'images/flame14.png',
	'images/flame15.png',
	'images/flame16.png',
	'images/flame17.png',
	'images/flame18.png',
	'images/flame19.png',
	'images/flame20.png',
	'images/flame21.png',
	'images/flame22.png',
	'images/flame23.png',
	'images/flame24.png'
];