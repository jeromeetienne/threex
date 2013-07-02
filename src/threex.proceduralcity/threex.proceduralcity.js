// from @mrdoob http://www.mrdoob.com/lab/javascript/webgl/city/01/

var THREEx = THREEx || {}

THREEx.ProceduralCity	= function(){
	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
	geometry.faces.splice( 3, 1 );
	geometry.faceVertexUvs[0].splice( 3, 1 );
	geometry.faceVertexUvs[0][2][0].set( 0, 0 );
	geometry.faceVertexUvs[0][2][1].set( 0, 0 );
	geometry.faceVertexUvs[0][2][2].set( 0, 0 );
	geometry.faceVertexUvs[0][2][3].set( 0, 0 );

	var building	= new THREE.Mesh( geometry );
	var cityGeometry= new THREE.Geometry();

	var light	= new THREE.Color( 0xffffff );
	var shadow	= new THREE.Color( 0x303050 );

	for ( var i = 0; i < 20000; i ++ ) {

		var value	= 1 - Math.random() * Math.random();
		var color	= new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );

		var top		= color.clone().multiply( light );
		var bottom	= color.clone().multiply( shadow );

		building.position.x	= Math.floor( Math.random() * 200 - 100 ) * 10;
		building.position.z	= Math.floor( Math.random() * 200 - 100 ) * 10;
		building.rotation.y	= Math.random()*Math.PI*2;
		building.scale.x	= building.scale.z = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
		building.scale.y	= ( Math.random() * Math.random() * Math.random() * building.scale.x ) * 8 + 8;

		var geometry	= building.geometry;
		
		for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
			if ( j === 2 ) {
				geometry.faces[ j ].vertexColors = [ color, color, color, color ];
			} else {
				geometry.faces[ j ].vertexColors = [ top, bottom, bottom, top ];
			}
		}
		
		THREE.GeometryUtils.merge( cityGeometry, building );
	}

	// generate the texture
	var texture		= new THREE.Texture( generateTexture() );
	texture.anisotropy	= renderer.getMaxAnisotropy();
	texture.needsUpdate	= true;

	// build the ultimate mesh
	var material	= new THREE.MeshLambertMaterial({
		map		: texture,
		vertexColors	: THREE.VertexColors
	});
	var mesh = new THREE.Mesh(cityGeometry, material );
	return mesh
	
	function generateTexture() {
		var canvas	= document.createElement( 'canvas' );
		canvas.width	= 32;
		canvas.height	= 64;

		var context	= canvas.getContext( '2d' );
		context.fillStyle	= '#ffffff';
		context.fillRect( 0, 0, 32, 64 );

		for( var y = 2; y < 64; y += 2 ){
			for( var x = 0; x < 32; x += 2 ){
				var value	= Math.floor( Math.random() * 64 );
				context.fillStyle = 'rgb(' + [ value, value, value ].join( ',' )  + ')';
				context.fillRect( x, y, 2, 1 );
			}
		}

		var canvas2	= document.createElement( 'canvas' );
		canvas2.width	= 512;
		canvas2.height	= 1024;

		var context	= canvas2.getContext( '2d' );
		context.imageSmoothingEnabled = false;
		context.webkitImageSmoothingEnabled = false;
		context.mozImageSmoothingEnabled = false;
		context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );

		return canvas2;
	}
}