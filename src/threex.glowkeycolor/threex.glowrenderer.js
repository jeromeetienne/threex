var THREEx	= THREEx || {};

THREEx.GlowRenderer	= function(renderer, camera, scene, keyColor, glowColor){

	keyColor	= keyColor	|| new THREE.Color('hotpink')
	glowColor	= glowColor	|| new THREE.Color('red')

	this.keyColor	= keyColor
	this.glowColor	= glowColor

	var glow	= new THREEx.GlowKeyColor(renderer, camera, undefined, scene)
	glow.filterEffect.uniforms.keyColor.value	= keyColor
	glow.filterEffect.uniforms.glowColor.value	= glowColor

	//////////////////////////////////////////////////////////////////////////////////
	//		blend main scene with glow.renderTexture			//
	//////////////////////////////////////////////////////////////////////////////////

	var composer	= new THREE.EffectComposer(renderer)
	// add Render Pass
	var effect	= new THREE.RenderPass(scene, camera)
	composer.addPass( effect )

	// experiment to have only one renderPass
	// add Render Pass
	// var effect	= new THREE.ShaderPass(THREE.CopyShader)
	// effect.uniforms['tDiffuse' ].value	= glow.renderTarget
	// // glow.composer.passes[1].renderTarget;
	// composer.addPass( effect )

	// add Blend Pass - to blend with glow.renderTarget
	var effect	= new THREE.ShaderPass( THREEx.GlowKeyColor.BlendShader, 'tDiffuse1');
	effect.uniforms['tDiffuse2' ].value	= glow.renderTarget;
	effect.uniforms['mixRatio' ].value	= 0.5;
	effect.uniforms['opacity' ].value	= 2;
	effect.uniforms['keyColor' ].value	= keyColor;
	effect.uniforms['glowColor' ].value	= glowColor;
	composer.addPass( effect );	
	// mark the last pass as ```renderToScreen```
	composer.passes[composer.passes.length-1].renderToScreen	= true;

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	this.update	= function(delta, now){
		glow.update(delta)
		composer.render(delta);
	}
}