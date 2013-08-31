threex.laser
============

It is a 
[threex](http://jeromeetienne.github.io/threex/) extension 
for 
[three.js](http://threejs.org)
which provide a laser like display.
You can do a simple laser beam which display the laser as transparent and additive blending.
Or you can get something more cooked.
```THREEx.LaserCooked``` provides dynamic collision, cool impact effect with point light and
impact sprites.


Show Don't Tell
===============
* [examples/demo.html](http://jeromeetienne.github.io/threex.laser/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/demo.html)\] :
It shows a demo with cooked laser impacting a moving torus.
* [examples/laserbeam.html](http://jeromeetienne.github.io/threex.laser/examples/laserbeam.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/laserbeam.html)\] :
It shows a usage of threex.laserbeam.js, it could be the basis for a light sword for example.
* [examples/lasercooked.html](http://jeromeetienne.github.io/threex.laser/examples/lasercooked.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/lasercooked.html)\] :
It shows a usage of threex.lasercooked.js. The laser is inside a cube, the cube is
filled with toruses positioned at random, and the laser is colliding with other objects.


How To Use It
=============

## threex.laserbeam.js
It is a raw laser beam using dynamic textures.
Here is to create the laser beam and add it to the scene.

```javascript
var laserBeam	= new THREEx.LaserBeam()
scene.add(laserBeam)
```

## threex.lasercooked.js
It is a laser beam with dynamic collision. 
On impacts, to increase realism, there is sprite and point light.
It depends on ```THREEx.LaserBeam``` so first create it and add it to the scene

```javascript
var laserBeam	= new THREEx.LaserBeam()
scene.add(laserBeam)
```

Then you create the laserCooked based on it. Don't forget to update it in your render loop.

```javascript
var laserCooked	= new THREEx.LaserCooked(laserBeam)
onRenderFcts.push(function(delta, now){
	// every time you render the scene, update laserCooked
	laserCooked.update(delta, now)
})
```


Possible Improvements
=====================
* make light vary random for realism
* leave a mark on the wall
  * multimaterialobejct
  * each object for a texture in a empty canvas
  * draw in this canvas and update the texture
* laser with pointing leap 
* laser DEMO
  * box
  * on left side, laser to the right
  * on right side, laser to the left
  * in the middle a torus rotating in x and y
* DONE remove the lightsaber
  * rename that threex.laser