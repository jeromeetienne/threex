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
	//		init params							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var badTVParams	= {
		mute:true,
		show: true,
		distortion: 3.0,
		distortion2: 1.0,
		speed: 0.3,
		rollSpeed: 0.1
	}
	this.badTVParams= badTVParams
	var staticParams	= {
		show: true,
		amount:0.5,
		size2:4.0
	}
	this.staticParams	= staticParams
	var rgbParams	= {
		show: true,
		amount: 0.005,
		angle: 0.0,
	}
	this.rgbParams	= rgbParams
	var filmParams	= {
		show: true,
		count: 800,
		sIntensity: 0.9,
		nIntensity: 0.4
	}
	this.filmParams	= filmParams
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.onParamsChange	= onParamsChange
	function onParamsChange() {
		//copy gui params into shader uniforms
		badTVPass.uniforms[ "distortion" ].value = badTVParams.distortion;
		badTVPass.uniforms[ "distortion2" ].value = badTVParams.distortion2;
		badTVPass.uniforms[ "speed" ].value = badTVParams.speed;
		badTVPass.uniforms[ "rollSpeed" ].value = badTVParams.rollSpeed;

		staticPass.uniforms[ "amount" ].value = staticParams.amount;
		staticPass.uniforms[ "size" ].value = staticParams.size2;

		rgbPass.uniforms[ "angle" ].value = rgbParams.angle*Math.PI;
		rgbPass.uniforms[ "amount" ].value = rgbParams.amount;

		filmPass.uniforms[ "sCount" ].value = filmParams.count;
		filmPass.uniforms[ "sIntensity" ].value = filmParams.sIntensity;
		filmPass.uniforms[ "nIntensity" ].value = filmParams.nIntensity;
	}

	this.randomizeParams	= randomizeParams
	function randomizeParams() {

		if (Math.random() <0.2){
			//you fixed it!
			badTVParams.distortion = 0.1;
			badTVParams.distortion2 =0.1;
			badTVParams.speed =0;
			badTVParams.rollSpeed =0;
			rgbParams.angle = 0;
			rgbParams.amount = 0;
			staticParams.amount = 0;

		}else{
			badTVParams.distortion = Math.random()*10+0.1;
			badTVParams.distortion2 =Math.random()*10+0.1;
			badTVParams.speed =Math.random()*.4;
			badTVParams.rollSpeed =Math.random()*.2;
			rgbParams.angle = Math.random()*2;
			rgbParams.amount = Math.random()*0.03;
			staticParams.amount = Math.random()*0.2;
		}

		onParamsChange();
	}
}