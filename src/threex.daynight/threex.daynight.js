var THREEx	= THREEx	|| {}

THREEx.DayNight	= {}

THREEx.DayNight.currentPhase	= function(sunAngle){
	if( Math.sin(sunAngle) > Math.sin(0) ){
		return 'day'
	}else if( Math.sin(sunAngle) > Math.sin(-Math.PI/6) ){
		return 'twilight'
	}else{
		return 'night'
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		SunLight							//
//////////////////////////////////////////////////////////////////////////////////

THREEx.DayNight.SunLight	= function(){
	var light	= new THREE.DirectionalLight( 0xffffff, 1 );
	this.object3d	= light
	
	this.update	= function(sunAngle){
		light.position.x = 0;
		light.position.y = Math.sin(sunAngle) * 90000;
		light.position.z = Math.cos(sunAngle) * 90000;
// console.log('Phase ', THREEx.DayNight.currentPhase(sunAngle))

		var phase	= THREEx.DayNight.currentPhase(sunAngle)
		if( phase === 'day' ){
			light.color.set("rgb(255,"+ (Math.floor(Math.sin(sunAngle)*200)+55) + "," + (Math.floor(Math.sin(sunAngle)*200)) +")");
		}else if( phase === 'twilight' ){
		        light.intensity = 1;
	        	light.color.set("rgb(" + (255-Math.floor(Math.sin(sunAngle)*510*-1)) + "," + (55-Math.floor(Math.sin(sunAngle)*110*-1)) + ",0)");
		} else {
			light.intensity	= 0;
		}
	}	
}

//////////////////////////////////////////////////////////////////////////////////
//		SunSphere							//
//////////////////////////////////////////////////////////////////////////////////

THREEx.DayNight.SunSphere	= function(){
	var geometry	= new THREE.SphereGeometry( 20000, 30, 30 )
	var material	= new THREE.MeshBasicMaterial({
		color		: 0xff0000
	})
	var mesh	= new THREE.Mesh(geometry, material)
	this.object3d	= mesh

	this.update	= function(sunAngle){
		mesh.position.x = 0;
		mesh.position.y = Math.sin(sunAngle) * 400000;
		mesh.position.z = Math.cos(sunAngle) * 400000;

		var phase	= THREEx.DayNight.currentPhase(sunAngle)
		if( phase === 'day' ){
			mesh.material.color.set("rgb(255,"+ (Math.floor(Math.sin(sunAngle)*200)+55) + "," + (Math.floor(Math.sin(sunAngle)*200)+5) +")");
		}else if( phase === 'twilight' ){
			mesh.material.color.set("rgb(255,55,5)");
		} else {
		}
	}
}


//////////////////////////////////////////////////////////////////////////////////
//		Skydom								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.DayNight.Skydom		= function(){
	var geometry	= new THREE.SphereGeometry( 700000, 32, 15 );
	var shader	= THREEx.DayNight.Skydom.Shader
	var uniforms	= THREE.UniformsUtils.clone(shader.uniforms)
	var material	= new THREE.ShaderMaterial({
		vertexShader	: shader.vertexShader,
		fragmentShader	: shader.fragmentShader,
		uniforms	: uniforms,
		side		: THREE.BackSide
	});

	var mesh	= new THREE.Mesh( geometry, material );
	this.object3d	= mesh
	
	this.update	= function(sunAngle){
		var phase	= THREEx.DayNight.currentPhase(sunAngle)
		if( phase === 'day' ){
			uniforms.topColor.value.set("rgb(0,120,255)");
			uniforms.bottomColor.value.set("rgb(255,"+ (Math.floor(Math.sin(sunAngle)*200)+55) + "," + (Math.floor(Math.sin(sunAngle)*200)) +")");
		} else if( phase === 'twilight' ){
			uniforms.topColor.value.set("rgb(0," + (120-Math.floor(Math.sin(sunAngle)*240*-1)) + "," + (255-Math.floor(Math.sin(sunAngle)*510*-1)) +")");
			uniforms.bottomColor.value.set("rgb(" + (255-Math.floor(Math.sin(sunAngle)*510*-1)) + "," + (55-Math.floor(Math.sin(sunAngle)*110*-1)) + ",0)");
		} else {
			uniforms.topColor.value.set('black')
			uniforms.bottomColor.value.set('black');
		}		
	}
}

THREEx.DayNight.Skydom.Shader	= {
	uniforms	: {
		topColor	: { type: "c", value: new THREE.Color().setHSL( 0.6, 1, 0.75 ) },
		bottomColor	: { type: "c", value: new THREE.Color( 0xffffff ) },
		offset		: { type: "f", value: 400 },
		exponent	: { type: "f", value: 0.6 },
	},
	vertexShader	: [
		'varying vec3 vWorldPosition;',
		'void main() {',
		'	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
		'	vWorldPosition = worldPosition.xyz;',
		'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}',
	].join('\n'),
	fragmentShader	: [
		'uniform vec3 topColor;',
		'uniform vec3 bottomColor;',
		'uniform float offset;',
		'uniform float exponent;',

		'varying vec3 vWorldPosition;',

		'void main() {',
		'	float h = normalize( vWorldPosition + offset ).y;',
		'	gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );',
		'}',
	].join('\n'),
}


