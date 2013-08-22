threex.sslensflare
==================

It is a three.js extension to get 
[screen space lens flare]()
as described in 
["pseudo lens flare" post](http://john-chapman-graphics.blogspot.fr/2013/02/pseudo-lens-flare.html)
by 
[John Chapman](http://john-chapman-graphics.blogspot.fr).

How To Use It
=============

First you need to render the scene 

```javascript
var colorRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
	minFilter : THREE.LinearFilter,
	magFilter : THREE.LinearFilter,
	format    : THREE.RGBFormat,
});
updateFcts.push(function(){
	renderer.render( scene, camera, colorRenderTarget );    
})
```

Then you generate the lens flare base on ```colorRenderTarget```

```javascript
var ssLensFlare	= new THREEx.SsLensFlare(renderer, colorRenderTarget)
updateFcts.push(function(delta, now){
	ssLensFlare.update(delta, now)
})
```

then it is up to you to blend them together. here is an example which 
add camera dirt and stardust on top.

```javascript
var composer	= new THREE.EffectComposer(renderer);

// add Render Pass
var effect	= new THREE.TexturePass(colorRenderTarget);
composer.addPass( effect );

// add blend with lensflare
var effect	= new THREE.ShaderPass(THREEx.SsLensFlare.BlendShader);
effect.uniforms['tLensDirt' ].value	= THREE.ImageUtils.loadTexture( "../images/lensdirt.png" )
effect.uniforms['tLensStar' ].value	= THREE.ImageUtils.loadTexture( "../images/lensstar.png" )
effect.uniforms['tLensColor' ].value	= ssLensFlare.lensRenderTarget
composer.addPass( effect );	

// mark the last pass as ```renderToScreen```
composer.passes[composer.passes.length-1].renderToScreen	= true;

updateFcts.push(function(delta, now){
	composer.render(delta);
})	
```

TODO
====
* rotationZ for diffraction starburst
  * with a rotationZ based on camera position 
