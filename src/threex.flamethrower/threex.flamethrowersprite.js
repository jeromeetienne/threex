var THREEx	= THREEx	|| {}

THREEx.FlameThrowerSprite	= function(texture, nTiles, onReady){
	onReady	= onReady	|| function(){}
	// init texture
	var texture	= new THREEx.FlameThrowerTexture(function(texture, nTiles){
		onReady(this)
	}.bind(this))
	this.texture	= texture
	// init sprite material
	var material	= new THREE.SpriteMaterial({
		map			: texture,
		useScreenCoordinates	: false,
		transparent		: true,
		blending		: THREE.AdditiveBlending
	})
	// init sprite
	var sprite	= new THREE.Sprite(material)
	this.object3d	= sprite

	// get the number of tiles
	var nTiles	= THREEx.FlameThrowerTexture.imageUrls.length
	this.nTiles	= nTiles
	material.uvScale.set(1, 1/nTiles)

	this.setTile	= function(imageIdx){
		var uvOffsetY	= 1 - imageIdx * 1/nTiles;
		material.uvOffset.set(0, uvOffsetY)
	}
}