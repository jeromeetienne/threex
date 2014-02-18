var THREEx	= THREEx	|| {}


THREEx.Terrain	= {}

/**
 * allocate the heightmap
 * 
 * @param  {Number} width the width of the heightmap
 * @param  {Number} depth the depth of the heightmap
 * @return {Array} the allocated heightmap
 */
THREEx.Terrain.allocateHeightMap	= function(width, depth){
	// TODO use typedarray
	var heightMap	= new Array(width)
	for(var x = 0; x < width; x++){
		heightMap[x]	= new Array(depth)		
	}
	return heightMap
}

/**
 * generate a heightmap using a simplex noise
 * @todo make it it tunable... how ?
 * 
 * @param  {Array} heightMap the heightmap to store the data
 */
THREEx.Terrain.simplexHeightMap	= function(heightMap){
	// get heightMap dimensions
	var width	= heightMap.length
	var depth	= heightMap[0].length

	var simplex	= new SimplexNoise()
	for(var x = 0; x < width; x++){
		for(var z = 0; z < depth; z++){
			var height	= 0
			var level	= 8
			height	+= (simplex.noise(x/level, z/level)/2 + 0.5) * 0.125
			level	*= 3
			height	+= (simplex.noise(x/level, z/level)/2 + 0.5) * 0.25
			level	*= 2
			height	+= (simplex.noise(x/level, z/level)/2 + 0.5) * 0.5
			level	*= 2
			height	+= (simplex.noise(x/level, z/level)/2 + 0.5) * 1
			height	/= 1+0.5+0.25+0.125
			heightMap[x][z]	= height
		}
	}
}

/**
 * build a canvas 2d from a heightmap
 * @param  {Array} heightMap heightmap
 * @param  {HTMLCanvasElement|undefined} canvas  the destination canvas. 
 * @return {HTMLCanvasElement}           the canvas
 */
THREEx.Terrain.heightMapToCanvas	= function(heightMap, canvas){
	// get heightMap dimensions
	var width	= heightMap.length
	var depth	= heightMap[0].length
	// create canvas
	canvas		= canvas	|| document.createElement('canvas')
	canvas.width	= width
	canvas.height	= depth
	var context	= canvas.getContext("2d");
	// loop on each pixel of the canvas
	for(var x = 0; x < canvas.width; x++){
		for(var y = 0; y < canvas.height; y++){
			var height	= heightMap[x][y]
			var color	= THREEx.Terrain.heightToColor(height)
			context.fillStyle	= color.getStyle()
			context.fillRect(x, y, 1, 1)
		}
	}
	// return the just built canvas
	return canvas
}

/**
 * Build a THREE.PlaneGeometry based on a heightMap
 * 
 * @param  {Array} heightMap the heightmap
 * @return {THREE.Geometry}  the just built geometry
 */
THREEx.Terrain.heightMapToPlaneGeometry	= function(heightMap){
	// get heightMap dimensions
	var width	= heightMap.length
	var depth	= heightMap[0].length
	// build geometry
	var geometry	= new THREEx.Terrain.PlaneGeometry( 1, 1, width-1, depth-1)
	// loop on each vertex of the geometry
	for(var x = 0; x < width; x++){
		for(var z = 0; z < depth; z++){
			var height	= heightMap[x][z]
			var vertex	= geometry.vertices[x+z*width]
			vertex.z	= (height-0.5)*2
			// vertex.z	= x/width*2
		}
	}
	geometry.verticesNeedUpdate	= true

	// geometry.computeCentroids()
	// geometry.computeTangents()
	// geometry.tangentsNeedUpdate	= true
	// geometry.elementsNeedUpdate	= true

	geometry.computeFaceNormals()
	geometry.computeVertexNormals()
	geometry.normalsNeedUpdate	= true

	return geometry
}

THREEx.Terrain.heightMapToHeight	= function(heightMap, x, z){
	// get heightMap dimensions
	var width	= heightMap.length
	var depth	= heightMap[0].length
	// sanity check - boundaries
	console.assert( x >= 0 && x <= width )
	console.assert( z >= 0 && z <= depth )
	
	var deltaX	= x - Math.floor(x)
	var deltaZ	= z - Math.floor(z)

	var heightNW	= heightMap[Math.floor(x)][Math.floor(z)]
	var heightNE	= heightMap[Math.ceil (x)][Math.floor(z)]
	var heightSW	= heightMap[Math.floor(x)][Math.ceil (z)]
	var heightSE	= heightMap[Math.ceil (x)][Math.ceil (z)]

	// debugger;

	// - what is in the ne triangle, what is in sw triangle
	// - computation depends on that
	var inTriangleNE= deltaX > deltaZ ? true : false
	console.log('inTriangleNE', inTriangleNE)

	if( inTriangleNE ){
		deltaX		= 1 - deltaX

		var heightX	= heightNW + (heightNE-heightNW)*(deltaX)
		var heightZ	= heightNW + (heightSW-heightNW)*(deltaZ)

		return heightNW
	}else{
		return heightNW
	}

	return height
}

THREEx.Terrain.planeToHeightMapCoords	= function(position, heightMap, planeMesh){
	// TODO assert no rotation in planeMesh

	// set position relative to planeMesh position
	position.sub(planeMesh.position)

	// heightMap origin is at its top-left, while planeMesh origin is at its center
	position.x	+= planeMesh.geometry.width/2
	position.z	+= planeMesh.geometry.height/2

	position.x	/= planeMesh.geometry.width
	position.z	/= planeMesh.geometry.height

	var height	= THREEx.Terrain.heightMapToHeight(heightMap, position.x, position.z)
console.log('height', height)

	return position;
}

/**
 * Set the vertex color for a THREE.Geometry based on a heightMap
 * 
 * @param  {Array} heightMap the heightmap
 * @param  {THREE.Geometry} geometry  the geometry to set
 */
THREEx.Terrain.heightMapToVertexColor	= function(heightMap, geometry){
	// get heightMap dimensions
	var width	= heightMap.length
	var depth	= heightMap[0].length
	// loop on each vertex of the geometry
	var color	= new THREE.Color()
	for(var i = 0; i < geometry.faces.length; i++){
		var face	= geometry.faces[i]
		if( face instanceof THREE.Face4 ){
			console.assert(face instanceof THREE.Face4)
			face.vertexColors.push( vertexIdxToColor(face.a).clone() )
			face.vertexColors.push( vertexIdxToColor(face.b).clone() )
			face.vertexColors.push( vertexIdxToColor(face.c).clone() )
			face.vertexColors.push( vertexIdxToColor(face.d).clone() )
		}else if( face instanceof THREE.Face3 ){
			console.assert(face instanceof THREE.Face3)
			face.vertexColors.push( vertexIdxToColor(face.a).clone() )
			face.vertexColors.push( vertexIdxToColor(face.b).clone() )
			face.vertexColors.push( vertexIdxToColor(face.c).clone() )
		}else	console.assert(false)
	}
	geometry.colorsNeedUpdate	= true
	return
	
	function vertexIdxToColor(vertexIdx){
		var x		= Math.floor(vertexIdx % width)
		var z		= Math.floor(vertexIdx / width)
		var height	= heightMap[x][z]
		return THREEx.Terrain.heightToColor(height)
	}
}

/**
 * give a color based on a given height
 * 
 * @param {Number} height the height
 * @return {THREE.Color} the color for this height
 */
THREEx.Terrain.heightToColor	= (function(){
	var color	= new THREE.Color()
	return function(height){
		// compute color based on height
		if( height < 0.5 ){
			height		= (height*2)*0.5 + 0.2
			color.setRGB(0,0, height)
		}else if( height < 0.7 ){
			height		= (height-0.5)/0.2
			height		= height*0.5 + 0.2
			color.setRGB(0,height, 0)
		}else{
			height		= (height-0.7)/0.3
			height		= height*0.5 + 0.5
			color.setRGB(height,height, height)
		}
		// color.setRGB(1,1,1)
		return color;		
	}
})()

/**
 * plane geometry with THREE.Face3 from three.js r66
 * 
 * @param {[type]} width          [description]
 * @param {[type]} height         [description]
 * @param {[type]} widthSegments  [description]
 * @param {[type]} heightSegments [description]
 */
THREEx.Terrain.PlaneGeometry = function ( width, height, widthSegments, heightSegments ) {

	THREE.Geometry.call( this );

	this.width = width;
	this.height = height;

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;

	var ix, iz;
	var width_half = width / 2;
	var height_half = height / 2;

	var gridX = this.widthSegments;
	var gridZ = this.heightSegments;

	var gridX1 = gridX + 1;
	var gridZ1 = gridZ + 1;

	var segment_width = this.width / gridX;
	var segment_height = this.height / gridZ;

	var normal = new THREE.Vector3( 0, 0, 1 );

	for ( iz = 0; iz < gridZ1; iz ++ ) {

		for ( ix = 0; ix < gridX1; ix ++ ) {

			var x = ix * segment_width - width_half;
			var y = iz * segment_height - height_half;

			this.vertices.push( new THREE.Vector3( x, - y, 0 ) );

		}

	}

	for ( iz = 0; iz < gridZ; iz ++ ) {

		for ( ix = 0; ix < gridX; ix ++ ) {

			var a = ix + gridX1 * iz;
			var b = ix + gridX1 * ( iz + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iz + 1 );
			var d = ( ix + 1 ) + gridX1 * iz;

			var uva = new THREE.Vector2( ix / gridX, 1 - iz / gridZ );
			var uvb = new THREE.Vector2( ix / gridX, 1 - ( iz + 1 ) / gridZ );
			var uvc = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - ( iz + 1 ) / gridZ );
			var uvd = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iz / gridZ );

			var face = new THREE.Face3( a, b, d );
			face.normal.copy( normal );
			face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );

			this.faces.push( face );
			this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

			face = new THREE.Face3( b, c, d );
			face.normal.copy( normal );
			face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );

			this.faces.push( face );
			this.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

		}

	}

	this.computeCentroids();

};

THREEx.Terrain.PlaneGeometry.prototype = Object.create( THREE.Geometry.prototype );
