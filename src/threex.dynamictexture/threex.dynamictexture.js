var THREEx	= THREEx	|| {}


THREEx.DynamicTexture	= function(width, height){
	var canvas	= document.createElement( 'canvas' );
	canvas.width	= width
	canvas.height	= height
	var context	= canvas.getContext( '2d' );
	
	this.canvas	= canvas
	this.context	= context
	
	var texture	= new THREE.Texture(canvas)
	this.texture	= texture
}

/**
 * clear the canvas
 * @param  {String*} fillStyle the fillStyle to clear with, if not provided, fallback on .clearRect
 * @return {THREEx.DynamicTexture}           the object itself, for chained texture
 */
THREEx.DynamicTexture.prototype.clear = function(fillStyle){
	if( fillStyle !== undefined ){
		this.context.fillStyle	= fillStyle
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height)		
	}else{
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height)		
	}
	// make the texture as .needsUpdate
	this.texture.needsUpdate	= true;
	// for chained API 
	return this;
}

/**
 * draw text
 * 
 * @param  {String}		text	the text to display
 * @param  {Number|undefined}	x	if provided, it is the x where to draw, if not, the text is centered
 * @param  {Number}		y	the y where to draw the text
 * @param  {String*} 		fillStyle the fillStyle to clear with, if not provided, fallback on .clearRect
 * @param  {String*} 		contextFont the font to use
 * @return {THREEx.DynamicTexture}	the object itself, for chained texture
 */
THREEx.DynamicTexture.prototype.drawText = function(text, x, y, fillStyle, contextFont){
	// set font if needed
	if( contextFont !== undefined )	this.context.font = contextFont;
	// if x isnt provided 
	if( x === undefined || x === null ){
		var textSize	= this.context.measureText(text);
		x = (this.canvas.width - textSize.width) / 2;
	}
	// actually draw the text
	this.context.fillStyle = fillStyle;
	this.context.fillText(text, x, y);
	// make the texture as .needsUpdate
	this.texture.needsUpdate	= true;
	// for chained API 
	return this;
};
