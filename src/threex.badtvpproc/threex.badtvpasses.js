var THREEx	= THREEx	|| {}


THREEx.BadTVPasses	= function(){
	// create shaders passes
	var badTVPass	= new THREE.ShaderPass( THREE.BadTVShader );
	this.badTVPass	= badTVPass
	
	var rgbPass	= new THREE.ShaderPass( THREE.RGBShiftShader );
	this.rgbPass	= rgbPass
	
	var filmPass	= new THREE.ShaderPass( THREE.FilmShader );
	this.filmPass	= filmPass
	filmPass.uniforms[ "grayscale" ].value = 0;

	var staticPass	= new THREE.ShaderPass( THREE.StaticShader );
	this.staticPass	= staticPass

	this.addPassesTo	= function(composer){
		composer.addPass( filmPass );
		composer.addPass( badTVPass );
		composer.addPass( rgbPass );
		composer.addPass( staticPass );	
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	this.update	= function(delta, now){
		badTVPass.uniforms[ 'time' ].value	= now
		filmPass.uniforms[ 'time' ].value	= now
		staticPass.uniforms[ 'time' ].value	= now

		// params.lerp(dstParams, 0.01)
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var params	= new THREEx.BadTVPasses.Params()
	this.params	= params
	// params.randomize()

	// this.lerpSpeed	= 0.1

	// var dstParams	= new THREEx.BadTVPasses.Params()
	// this.params	= dstParams
	this.params.randomize()
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.onParamsChange	= onParamsChange
	function onParamsChange() {
		//copy gui params into shader uniforms
		badTVPass.uniforms[ "distortion" ].value	= params.badTV.distortion;
		badTVPass.uniforms[ "distortion2" ].value	= params.badTV.distortion2;
		badTVPass.uniforms[ "speed" ].value		= params.badTV.speed;
		badTVPass.uniforms[ "rollSpeed" ].value		= params.badTV.rollSpeed;

		staticPass.uniforms[ "amount" ].value		= params.staticNoise.amount;
		staticPass.uniforms[ "size" ].value		= params.staticNoise.size2;

		rgbPass.uniforms[ "angle" ].value		= params.rgb.angle*Math.PI;
		rgbPass.uniforms[ "amount" ].value		= params.rgb.amount;

		filmPass.uniforms[ "sCount" ].value		= params.film.count;
		filmPass.uniforms[ "sIntensity" ].value		= params.film.sIntensity;
		filmPass.uniforms[ "nIntensity" ].value 	= params.film.nIntensity;
	}
}

THREEx.BadTVPasses.Params	= function(){
	var badTV	= this.badTV	= {
		distortion	: 3.0,
		distortion2	: 1.0,
		speed		: 0.3,
		rollSpeed	: 0.1
	}
	var staticNoise	= this.staticNoise	= {
		amount		: 0.5,
		size2		: 4.0
	}
	var rgb	= this.rgb	= {
		amount		: 0.005,
		angle		: 0.0,
	}
	var film	= this.film	= {
		count		: 800,
		sIntensity	: 0.9,
		nIntensity	: 0.4
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.lerp	= function(targetParams, alpha){
		console.log('distortion', this.badTV.distortion, targetParams.badTV.distortion)
		this.badTV.distortion	+= (targetParams.badTV.distortion - this.badTV.distortion) * alpha
		this.badTV.distortion2	+= (targetParams.badTV.distortion2 - this.badTV.distortion2) * alpha
		this.badTV.speed	+= (targetParams.badTV.speed - this.badTV.speed) * alpha
		this.badTV.rollSpeed	+= (targetParams.badTV.rollSpeed - this.badTV.rollSpeed) * alpha

		this.staticNoise.amount	+= (targetParams.staticNoise.amount - this.staticNoise.amount) * alpha
		this.staticNoise.size2	+= (targetParams.staticNoise.size2 - this.staticNoise.size2) * alpha

		this.rgb.amount		+= (targetParams.rgb.amount - this.rgb.amount) * alpha
		this.rgb.angle		+= (targetParams.rgb.angle - this.rgb.angle) * alpha

		this.film.count		+= (targetParams.film.count - this.film.count) * alpha
		this.film.sIntensity	+= (targetParams.film.sIntensity - this.film.sIntensity) * alpha
		this.film.nIntensity	+= (targetParams.film.nIntensity - this.film.nIntensity) * alpha
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	/**
	 * randomize the parameter
	 */
	this.randomize	= function(){
		badTV.distortion	= Math.random()*10+0.1;
		badTV.distortion2	= Math.random()*10+0.1;
		badTV.speed		= Math.random()*.4;
		badTV.rollSpeed		= Math.random()*.2;
		rgb.angle		= Math.random()*2;
		rgb.amount		= Math.random()*0.03;
		staticNoise.amount	= Math.random()*0.2;
	}

	/**
	 * reset parameters as it appears as no effect
	 */
	this.reset	= function(){
		badTV.distortion	= 0.1;
		badTV.distortion2	= 0.1;
		badTV.speed		= 0;
		badTV.rollSpeed		= 0;
		rgb.angle		= 0;
		rgb.amount		= 0;
		staticNoise.amount	= 0;		
	}
}