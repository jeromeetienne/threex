define( [ 'module'			// to set .baseURL
	, './threex.textureutils'
	, './threex.flamethrowertexture'
	, './threex.flamethrowersprite'
	, './threex.flamethroweremitter'
	, './threex.flamethrowerfull'
	, './webaudiox.flamethrower'
	], function(module){
	// set baseUrl for this extension
	THREEx.FlameThrowerTexture.baseUrl	= module.uri+'/../'
	WebAudiox.FlameThrower.baseUrl		= module.uri+'/../'
});