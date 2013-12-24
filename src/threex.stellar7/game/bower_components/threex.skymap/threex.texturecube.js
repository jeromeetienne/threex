/** @namespace */
var THREEx	= THREEx || {}


/**
 * Create a texture cube. Suitable for skymap or envmap
 * 
 * @returns {THREE.Texture} the just-built texture 
*/
THREEx.createTextureCube	= function(opts){
	// handle parameters polymorphisms
	if( typeof(opts) === 'string' ){
		console.assert( THREEx.TextureCube.WellKnownUrls[opts], "no THREEx.TextureCube.WellKnownUrls for "+opts);
		var urls	= THREEx.TextureCube.WellKnownUrls[opts];
	}else if( opts instanceof THREE.Texture ){
		var textureCube	= opts;
		return textureCube;
	}else if( opts instanceof Array ){
		var urls	= opts;
	}else	console.assert(false, "opts invalid type "+opts);
	// sanity check
	console.assert(urls.length === 6)
	// create the textureCube
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
	// return it
	return textureCube;
}

THREEx.TextureCube		= {}
THREEx.TextureCube.baseUrl	= "../";

/**
 * To create urls compatible with THREE.ImageUtils.loadTextureCube
*/
THREEx.TextureCube.createUrls	= function(basename, format, rootUrl, posPrefix, negPrefix){
	posPrefix	= posPrefix || "p";
	negPrefix	= negPrefix || "n";
	var path	= rootUrl + "/" + basename + "/";
	var urls	= [
		path + posPrefix + 'x' + format, path + negPrefix + 'x' + format,
		path + posPrefix + 'y' + format, path + negPrefix + 'y' + format,
		path + posPrefix + 'z' + format, path + negPrefix + 'z' + format
	];
	return urls;
}

THREEx.TextureCube.initWellKnownUrls	= function(baseUrl){
	var wellKnownUrls	= {};
	var rootUrl		= baseUrl+'images/';
	wellKnownUrls['bridge2']		= THREEx.TextureCube.createUrls('Bridge2'		, '.jpg', rootUrl, 'pos', 'neg'),
	wellKnownUrls['escher']			= THREEx.TextureCube.createUrls('Escher'		, '.jpg', rootUrl),
	wellKnownUrls['park2']			= THREEx.TextureCube.createUrls('Park2'			, '.jpg', rootUrl, 'pos', 'neg'),
	wellKnownUrls['park3med']		= THREEx.TextureCube.createUrls('Park3Med'		, '.jpg', rootUrl),
	wellKnownUrls['pisa']			= THREEx.TextureCube.createUrls('pisa'			, '.png', rootUrl),
	wellKnownUrls['skybox']			= THREEx.TextureCube.createUrls('skybox'		, '.jpg', rootUrl),
	wellKnownUrls['swedishroyalcastle']	= THREEx.TextureCube.createUrls('SwedishRoyalCastle'	, '.jpg', rootUrl),

	wellKnownUrls['mars']			= THREEx.TextureCube.createUrls('mars'			, '.jpg', rootUrl)

	// copy result
	THREEx.TextureCube.WellKnownUrls	= wellKnownUrls
}

/**
 * predefined urls compatible with THREE.ImageUtils.loadTextureCube.
 * They points toward the cube maps in plugins/assets
*/
THREEx.TextureCube.WellKnownUrls	= {}

THREEx.TextureCube.initWellKnownUrls(THREEx.TextureCube.baseUrl);
	

