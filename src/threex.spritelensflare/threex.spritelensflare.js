var THREEx	= THREEx	|| {}

/**
 * This is the same as three.js example, but made reusable
 * @param {[type]} color [description]
 */
THREEx.SpriteLensFlare	= function(color){
	color		= color	|| new THREE.Color('white')
	// load texture and cache them
	var baseUrl	= THREEx.SpriteLensFlare.baseUrl

	var cache	= THREEx.SpriteLensFlare
	cache.texture0	= cache.texture0 || THREE.ImageUtils.loadTexture( baseUrl+'images/lensflare/lensflare0.png' )
	cache.texture2	= cache.texture2 || THREE.ImageUtils.loadTexture( baseUrl+'images/lensflare/lensflare2.png' )
	cache.texture3	= cache.texture3 || THREE.ImageUtils.loadTexture( baseUrl+'images/lensflare/lensflare3.png' )

	var lensFlare = new THREE.LensFlare( cache.texture0, 700, 0.0, THREE.AdditiveBlending, color );
	lensFlare.customUpdateCallback = lensFlareUpdateCallback;

	lensFlare.add( cache.texture2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( cache.texture2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( cache.texture2, 512, 0.0, THREE.AdditiveBlending );

	lensFlare.add( cache.texture3,  60, 0.6, THREE.AdditiveBlending );
	lensFlare.add( cache.texture3,  70, 0.7, THREE.AdditiveBlending );
	lensFlare.add( cache.texture3, 120, 0.9, THREE.AdditiveBlending );
	lensFlare.add( cache.texture3,  70, 1.0, THREE.AdditiveBlending );

	
	return lensFlare

	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////
	function lensFlareUpdateCallback( object ) {
		var vecX = -object.positionScreen.x * 2;
		var vecY = -object.positionScreen.y * 2;

		for( var f = 0; f < object.lensFlares.length; f++ ) {
			var flare = object.lensFlares[ f ];

			flare.x = object.positionScreen.x + vecX * flare.distance;
			flare.y = object.positionScreen.y + vecY * flare.distance;

			flare.rotation = 0;
		}

		object.lensFlares[ 2 ].y += 0.025;
		object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );

	}
}

THREEx.SpriteLensFlare.baseUrl	= '../'
