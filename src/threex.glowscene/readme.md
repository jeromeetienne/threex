threex.glow
===========

threex.glow makes it easy to add glowing objects into your scene.
It is a selective glow, so it is possible to have some glowing objects 
along with non glowing objects on the same scene.


IDEA: make glow at geometry level
* algo
  1. dilate geometrie
  2. show back face
  3. atmosphere shader
* PRO single render pass
* may be interesting with soft sprite shader
* PRO glow is per color
* PRO fix the blending issue. underlying texture isnt burned by additive blend
* PRO glow level is affected by distance
  * glow in screenspace got single level

**TODO** see dev master blog to get various implementation of the blending

## Algorithm
* it is starting from a existing scene
* you render this scene in a render target using THREE.MeshBasicMaterial
* if the object is supposed to glow, you render it in the glowing color
* if the object is NOT supposed to glow, you render it in black
* this render target is then blurred
* the original scene is rendered normally, and then blended with the blur rendertarget
* it is that simple.

hmm it may not appear that simple at first, but stay with me here :)

## How to use it
We gonna explain here the content of ```examples/basic.html```.
So you can make tests and experiments on running code, while learning.
You include ```threex.glow.js``` in your code.
then you create create the glow itself

```
var glow	= new THREEx.Glow(renderer, camera);
```

you can add a dat.gui on it if you want, it helps fine tune your parameters.
For that you needs ```threex.glowdatgui.js``` too

```
new THREEx.addGlow2DatGui(glow)
```

### init the scene for glow rendering
The prepare the scene for the glow rendering. 
You are free to build it the way you want.
THREEx.glow doesn't care much.
All the object3d of this scene will be the ones used for the glow render.
so they will be blured and blended back into the original color render.

### Example of a way to build the scene for glowing rendering
Here is a example of scene cloning based on ```Object3D.userData.domClasses```,
a class system like the DOM one. 
So First you marks all the glowing object3d in the original scene, using the following lines

```
Object3D.userData.domClasses += ' glowing';
```

Then you use a code like that to build the glowing scene.

```
	// create materials which gonna be used when glowing is ON or OFF
	var materialOn	= new THREE.MeshBasicMaterial({ color: 0x88ccff })
	var materialOff	= new THREE.MeshBasicMaterial({ color: 'black'  })
	// actually copy the scene, while picking material based on .domClasses
	glow.copyScene(scene, function(srcObject){
		// return material based on .domClasses content
		var domClasses	= srcObject.userData.domClasses
		var glowing	= domClasses && domClasses.match(/glowing/)
		var material	= glowing ? materialOn	: materialOff
		return material				
	})
```

### how to render the glow
You just update the glow and it will do it

```
glow.update(delta)
```

### Blend glow back into main scene
So now that you got the glow rendered, you have to blend it with the normal
color rendering. Here is how to do it

```
// create a effect composer
var composer	= new THREE.EffectComposer(renderer);
// render the scene to get the color rendering actually done
var effect	= new THREE.RenderPass(scene, camera);
composer.addPass( effect );
// add Blend Pass - to blend color rendering with glow.renderTarget
var effect	= new THREE.ShaderPass( THREE.BlendShader, 'tDiffuse1');
effect.uniforms['tDiffuse2' ].value	= glow.renderTarget;
effect.uniforms['mixRatio' ].value	= 0.5;
effect.uniforms['opacity' ].value	= 2;
composer.addPass( effect );	
// mark the last pass as ```renderToScreen```
composer.passes[composer.passes.length-1].renderToScreen	= true;
```

and you are done. 
Every time you want to render this composer, you just have to do 

```
composer.render(delta);
```

## Status
stable

## Change Logs
* v1.0 initial version
  * reasonable API
  * basic demos

## FAQs
* how to make it fast
  * as the output of the glow is blurred a lot, it is possible to reduce significantly
  the size of the renderTarget without much artefacts

## Possible improvements
* to get the glow, it is cloning the geometry and render the whole scene
  * it consumes memory in cpu/gpu
  * it is doing another additional render of non-glowing object just to get the depth
  * possible to share depth map ? if so it would be possible to rerender only the glowing object and using the depth map from the first render.
* it is possible to do the glow using [chroma-key](https://en.wikipedia.org/wiki/Chroma_key)
  * the objects which will be glowing are rendered in a specific color e.g. 
    [hotpink](http://en.wikipedia.org/wiki/Variations_of_pink#Hot_pink)
    * any color which doesnt normally exist in the scene
  * the whole scene is rendered for colors
  * then the hotpink color is extracted from the rendered target
  * and this is the glow mask that you gonna use
  * you gonna blur it, only the hotpink