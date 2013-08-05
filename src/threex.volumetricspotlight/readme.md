threex.volumetricspotlight
==========================

threex.volumetricspotlight is a three.js extension which provide a 'good enought' spot light.
as in described in ["Good Enough" Volumetrics for Spotlights](http://john-chapman-graphics.blogspot.fr/2013/01/good-enough-volumetrics-for-spotlights.html)
post from 
[john chapman](http://john-chapman-graphics.blogspot.fr/).


TODO
====
* make a datGUI for it.
* issue with depthMap
  * using DepthMaterial atm so 8bits for depth
  * using 'depthRGBA' would provide a 32bits... much better
    * i cant take it off for whatever reason
* may be in the rendering of the depth texture with shader material
* THREE.MeshDepthMaterial produces 8bits depth… not too funky
  * What about rewriting the 'depth' shader... would that fix my issue ?
  * if so it isnt in the packDepth function
  * it is in the init/rendering of the depthPass

```
float packColor(vec3 color) {
   return color.r + color.g * 256.0 + color.b * 256.0 * 256.0;
}

vec3 unpackColor(float f) {
	vec3 color;
	color.b = floor(f / 256.0 / 256.0);
	color.g = floor((f - color.b * 256.0 * 256.0) / 256.0);
	color.r = floor(f - color.b * 256.0 * 256.0 - color.g * 256.0);
	// now we have a vec3 with the 3 components in range [0..256]. Let's normalize it!
	return color / 256.0;
}

```