threex.terrain
=============

threex.terrain is a three.js extension which provide an procedural terrain generated from
from a simplex noise.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.terrain/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.terrain/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.terrain/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.terrain/blob/master/examples/requirejs.html)\] :
It does that this way, and it is cool in that case.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.terrain.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.terrain
```

How To Use It
=============


To allocate a heightMap with a width of 100 and a depth of 200, do

```javascript
var heightMap	= THREEx.Terrain.allocateHeightMap(100, 200)
```

To generate some heights based on a simplex/perlin noise, do 

```javascript
THREEx.Terrain.simplexHeightMap(heightMap)
```

If you want to display the result in a canvas 2d, just do

```javascript
var canvas	= THREEx.Terrain.heightMapToCanvas(heightMap)
document.body.appendChild(canvas)
```

If you want to display it in three.js, built a ```THREE.PlaneGeometry``` for it

```javascript
// build the geometry
var geometry	= THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
// init the material
var material	= new THREE.MeshPhongMaterial();
// create the mesh and add it to the scene
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );
```

It is possible to enhance the rendering of this heightmap with some vertexColor, and a 
smoother shading if you want.

```
// build the geometry
var geometry	= THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
// set the vertexColor in the geometry
THREEx.Terrain.heightMapToVertexColor(heightMap, geometry)
// init the material
var material	= new THREE.MeshPhongMaterial({
	shading		: THREE.SmoothShading,
	vertexColors 	: THREE.VertexColors,
});
// create the mesh and add it to the scene
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );
```


