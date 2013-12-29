define( [ 'module'	// to set .baseURL
	, './threex.textureutils'
	, './threex.flamethrower'
	, './webaudiox.flamethrower'
	], function(module){
	// set baseUrl for this extension
	THREEx.FlameThrower.baseUrl	= module.uri+'/../'
	WebAudiox.FlameThrower.baseUrl	= module.uri+'/../'
});