threex.sslensflare
==================

It is a three.js extension to get 
[screen space lens flare]()
as described in 
["pseudo lens flare" post](http://john-chapman-graphics.blogspot.fr/2013/02/pseudo-lens-flare.html)
by 
[John Chapman](http://john-chapman-graphics.blogspot.fr).


TODO
====
* downsampling first pass
  * how ?
  * render color directly to renderTarget
    * renderer.render( sceneTmp, cameraOrtho, target, true );
  * open a effect composer
    * THREE.TexturePass from renderTarget
    * who decide the size of the output texture here
    * THREE.EffectComposer = function ( renderer, renderTarget );
    * ThresholdShader first
    * then FeatureGenerationShader
    * some blur
    * then BlendShader to screen

* make diffraction starburst
  * with a rotationZ based on camera position 