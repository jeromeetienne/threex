var THREEx	= THREEx || {};

THREEx.EffectComposer	= function(renderer, renderTarget){
	this._composer	= new THREE.EffectComposer( renderer, renderTarget );
}

THREEx.EffectComposer.prototype.update = function(delta){
	this._composer.render(delta);
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


THREEx.EffectComposer.prototype.finish	= function(){
	var composer	= this._composer;
	if( composer.passes.length === 0 )	return this;	
	composer.passes[composer.passes.length -1 ].renderToScreen	= true;
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		List of all the Passes						//
//////////////////////////////////////////////////////////////////////////////////

THREEx.EffectComposer.prototype.plainPass	= function(effect){
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};



THREEx.EffectComposer.prototype.renderPass	= function(scene, camera){
	// create the effect
	var effect	= new THREE.RenderPass( scene, camera );
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.vignette	= function(offset, darkness){
	// handle parameters default values
	offset	= offset 	!== undefined ? offset	: 1.01;
	darkness= darkness	!== undefined ? darkness: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.VignetteShader );
	// setup the effect
	effect.uniforms[ "offset"	].value	= offset;
	effect.uniforms[ "darkness"	].value = darkness;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.fxaa	= function(resolutionX, resolutionY){
	// handle parameters default values
	resolutionX	= resolutionX 	!== undefined ? resolutionX	: 1;
	resolutionY	= resolutionY 	!== undefined ? resolutionY	: 1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.FXAAShader );
	// setup the effect
	effect.uniforms[ "resolution"	].value.x	= resolutionX / window.innerWidth;
	effect.uniforms[ "resolution"	].value.y	= resolutionX / window.innerHeight;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.bloom	= function(strength, kernelSize, sigma, resolution){
	// let default to original function
	// create the effect
	var effect	= new THREE.BloomPass(strength, kernelSize, sigma, resolution);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.film	= function(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale){
	// let default to original function
	// create the effect
	var effect	= new THREE.FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.colorify	= function(color){
	// handle parameters default values
	color	= color	|| new THREE.Color(0xffdddd);
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ColorifyShader );
	// setup the effect
	effect.uniforms[ 'color' ].value.copy(color);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.sepia	= function(amount){
	// handle parameters default values
	amount	= amount !== undefined ? amount	: 0.9;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.SepiaShader );
	// setup the effect
	effect.uniforms[ "amount" ].value = amount;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.bleachbypass	= function(opacity){
	// handle parameters default values
	opacity	= opacity !== undefined ? opacity	: 0.95;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.BleachBypassShader );
	// setup the effect
	effect.uniforms[ "opacity" ].value = opacity;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.copy	= function(opacity){
	// handle parameters default values
	opacity	= opacity !== undefined ? opacity	: 1.0;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.CopyShader );
	// setup the effect
	effect.uniforms[ "opacity" ].value = opacity;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

THREEx.EffectComposer.prototype.horizontalBlur	= function(h){
	// handle parameters default values
	h	= h !== undefined ? h	: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader );
	// setup the effect
	// TODO how to handle this renderer size thing
	effect.uniforms[ 'h' ].value	= h / window.innerWidth;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
}

THREEx.EffectComposer.prototype.verticalBlur	= function(v){
	// handle parameters default values
	v	= v !== undefined ? v	: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader );
	// setup the effect
	// TODO how to handle this renderer size thing
	effect.uniforms[ 'v' ].value	= v / window.innerHeight;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
}

THREEx.EffectComposer.prototype.texturePass	= function(texture, opacity){
	// let default to original function
	// create the effect
	var effect	= new THREE.TexturePass(texture, opacity);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
}

THREEx.EffectComposer.prototype.blendPass	= function(texture, mixRatio, opacity){
	// handle parameters default values
	mixRatio	= mixRatio	!== undefined ? mixRatio	: 0.5;
	opacity		= opacity	!== undefined ? opacity 	: 2.0;
	// create the effect
	var pass	= new THREE.ShaderPass( THREE.BlendShader, 'tDiffuse1');
	// setup the effect
	pass.uniforms['tDiffuse2' ].value	= texture;
	pass.uniforms['mixRatio' ].value	= mixRatio;
	pass.uniforms['opacity' ].value		= opacity;
	// add the effect
	this._composer.addPass( pass );
	return this;	// for chained API
}


THREEx.EffectComposer.prototype.motionBlur	= function(mixRatio){
	// handle parameters default values
	mixRatio	= mixRatio !== undefined ? mixRatio	: 0.8;

	var renderTarget= new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.LinearFilter,
		format		: THREE.RGBFormat,
		stencilBuffer	: false
	});
	var effectSave	= new THREE.SavePass( renderTarget );
	var effectBlend	= new THREE.ShaderPass( THREE.BlendShader, "tDiffuse1" );
	effectBlend.uniforms[ 'tDiffuse2' ].value	= effectSave.renderTarget;
	effectBlend.uniforms[ 'mixRatio' ].value	= mixRatio;
	this._composer.addPass( effectBlend );
	this._composer.addPass( effectSave );
	return this;	// for chained API
}