/** @namespace */
var THREEx	= THREEx || {};

/** @namespace */
THREEx.ConvertArguments	= {};

/**
 * TODO
 * currently most calls are like
 * THREEx.ConvertArguments.toThreeColor.apply(THREEx.ConvertArguments.toThreeColor, args)
 * 
 */

/**
 * Convert the value into a THREE.Color object
 * 
 * @return {THREE.Color} the resulting color
*/
THREEx.ConvertArguments.toThreeColor	= function(args){
	// default convertions
	if( args.length === 1 && typeof(args[0]) === 'number'){
		return new THREE.Color(args[0]);
	}else if( args.length === 1 && typeof(args[0]) === 'string'){
		return new THREE.Color(args[0]);
	}else if( args.length === 1 && args[0] instanceof THREE.Color ){
		return args[0];
	}else if( args.length === 3 && typeof(args[0]) === 'number'
					&& typeof(args[1]) === 'number' 
					&& typeof(args[2]) === 'number' ){
		return new THREE.Color().setRGB(args[0], args[1], args[2]);
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};


/**
 * Convert the value into a THREE.Material object
 * 
 * @return {THREE.Material} the resulting color
*/
THREEx.ConvertArguments.toThreeMaterial	= function(args){
	// default convertions
	if( args.length === 1 && args[0] instanceof THREE.Material ){
		return args[0];
	}else if( args.length === 1 && args[0] instanceof tQuery.Material ){
		return args[0].get(0);
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

/**
 * Convert the args into a THREE.Vector3
 * @return {THREE.Vector3} the resulting THREE.Vector3
 */
THREEx.ConvertArguments.toVector3	= function(args){
	// handle parameters
	if( args.length === 0 ){
		return new THREE.Vector3()
	}else if( args[0] instanceof THREE.Vector3 && args.length === 1 ){
		return args[0]
	}else if( typeof args[0] === "number" && args.length === 3 ){
		return new THREE.Vector3(args[0], args[1], args[2]);
	}else if( args[0] instanceof Array && args.length === 1 ){
		return new THREE.Vector3(args[0][0], args[0][1], args[0][2]);
	}else{
		console.assert(false, "invalid parameter for Vector3");
	}
};

/**
 * Convert the args into a THREE.Vector2
 * @return {THREE.Vector2} the resulting THREE.Vector2
 */
THREEx.ConvertArguments.toVector2	= function(args){
	// handle parameters
	if( args[0] instanceof THREE.Vector2 && args.length === 1 ){
		return args[0]
	}else if( typeof args[0] === "number" && args.length === 2 ){
		return new THREE.Vector2(args[0], args[1]);
	}else{
		console.assert(false, "invalid parameter for Vector2");
	}
};

THREEx.ConvertArguments.toNumber	= function(value){
	if( args.length === 1 && typeof(value) === 'number'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

THREEx.ConvertArguments.toNumberZeroToOne	= function(value){
	if( args.length === 1 && typeof(value) === 'number'){
		value	= Math.min(value, 1.0);
		value	= Math.max(value, 0);
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

THREEx.ConvertArguments.toInteger	= function(value){
	if( args.length === 1 && typeof(value) === 'number'){
		value	= Math.floor(value);
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

THREEx.ConvertArguments.identity	= function(value){
	return value;
};

THREEx.ConvertArguments.toBoolean	= function(args){
	if( args.length === 1 && typeof(args[0]) === 'boolean'){
		return args[0];
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

THREEx.ConvertArguments.toString	= function(value){
	if( args.length === 1 && typeof(value) === 'string'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

THREEx.ConvertArguments.toTextureCube	= function(args){
	return THREEx.ConvertArguments.toTexture.apply(THREEx.ConvertArguments.toTexture, args);
};

THREEx.ConvertArguments.toTexture	= function(value){
	// default convertions
	if( args.length === 1 && value instanceof tQuery.Texture ){
		return args[0].get(0);
	}else if( args.length === 1 && value instanceof THREE.Texture ){
		return value;
	}else if( args.length === 1 && value instanceof THREE.WebGLRenderTarget ){
		return value;
	}else if( args.length === 1 && typeof(value) === 'string' ){
		return THREE.ImageUtils.loadTexture(value);
	}else if( args.length === 1 && (value instanceof Image
						|| value instanceof HTMLVideoElement
						|| value instanceof HTMLCanvasElement) ){
		var texture		= new THREE.Texture( value );
		texture.needsUpdate	= true;
		return texture;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};



