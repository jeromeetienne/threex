threex.skymap
=============
threex.skymap is a three.js extension to use the use of skymaps.
Additionnaly it provides samples of cubemaps taken in three.js examples.

Here is the basic example 
[live](http://jeromeetienne.github.io/threex/src/threex.skymap/examples/basic.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.skymap/examples/basic.html).
Here is the example with require.js
[live](http://jeromeetienne.github.io/threex/src/threex.skymap/examples/requirejs.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.skymap/examples/requirejs.html).

### How To Use It

For Skymap with a *well known urls*

```javascript
var mesh	= THREEx.createSkymap('mars')
scene.add( mesh )
```

For Skymap with your own skymap.

```javascript
var textureCube	= THREEx.createTextureCube([
	'cube_px.jpg', 'cube_nx.jpg',
	'cube_py.jpg', 'cube_ny.jpg',
	'cube_pz.jpg', 'cube_nz.jpg',
])
var mesh	= THREEx.createSkymap(textureCube)
scene.add( mesh )
```

For reflexion.

```javascript
var geometry	= new THREE.CubeGeometry( 1, 1, 1);
var material	= new THREE.MeshPhongMaterial();
// add the reflexion in material.envMap
material.envMap	= THREEx.createTextureCube('pisa')
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );
```