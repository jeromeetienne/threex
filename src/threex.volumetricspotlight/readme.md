threex.volumetricspotlight
==========================

threex.volumetricspotlight is a three.js extension which provide a 'good enought' spot light.
as in described in ["Good Enough" Volumetrics for Spotlights](http://john-chapman-graphics.blogspot.fr/2013/01/good-enough-volumetrics-for-spotlights.html)
post from 
[john chapman](http://john-chapman-graphics.blogspot.fr/).

TODO
====
* remove any depth 
* if so it become a simple geometry rendering, so pass
* put the depth work in a backup direction
  * experimentDepth


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
