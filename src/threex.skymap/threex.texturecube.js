/** @namespace */
var THREEx	= THREEx || {}


/**
 * Create a texture cube. Suitable for skymap or envmap
 * 
 * @returns {THREE.Texture} the just-built texture 
*/
THREEx.createTextureCube	= function(opts){
	// handle parameters polymorphisms
	if( arguments.length === 2  ){
		var path	= arguments[0];
		var format	= arguments[1];
		var urls	= [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];
	}else if( typeof(opts) === 'string' ){
		console.assert( THREEx.TextureCube.WellKnownUrls[opts], "no THREEx.TextureCube.WellKnownUrls for "+opts);
		var urls	= THREEx.TextureCube.WellKnownUrls[opts];
	}else if( opts instanceof THREE.Texture ){
		var textureCube	= opts;
		return textureCube;
	}else if( opts instanceof Array ){
		var urls	= opts;
	}else if( opts instanceof Object ){
		console.assert(opts.path	, "opts.path must be defined");
		console.assert(opts.format	, "opts.format must be defined");
		var urls	= [
			opts.path + 'px' + opts.format, opts.path + 'nx' + opts.format,
			opts.path + 'py' + opts.format, opts.path + 'ny' + opts.format,
			opts.path + 'pz' + opts.format, opts.path + 'nz' + opts.format
		];
	}else	console.assert(false, "opts invalid type "+opts);
	// sanity check
	console.assert(urls.length === 6)
	// create the textureCube
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
	// return it
	return textureCube;
}

THREEx.TextureCube		= {}
THREEx.TextureCube.baseUrl	= "../../threex.skymap/";

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
	

