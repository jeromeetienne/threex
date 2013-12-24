threex.skymap
=============
threex.skymap is a three.js extension to use the use of skymaps.
Additionnaly it provides skymaps of cubemaps taken in three.js examples.
You can find more examples of texture cubes [here](http://www.humus.name/index.php?page=Textures&&start=0)

Show, Don't Tell
================
* [examples/basic.html](http://jeromeetienne.github.io/threex.skymap/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.skymap/blob/master/examples/basic.html)\] :
It shows a basic usage with reflection and skybox.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.skymap/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.skymap/blob/master/examples/requirejs.html)\] :
It shows a basic usage with reflection and skybox thru require.js
* [examples/experimentwater.html](http://jeromeetienne.github.io/threex.skymap/examples/experimentwater.html)
\[[view source](https://github.com/jeromeetienne/threex.skymap/blob/master/examples/experimentwater.html)\] :
It shows an experimentation for water


How To Install It
=================

You can install it manually. Just do 

```html
<script src='threex.skymap.js'></script>
<script src='threex.texturecube.js'></script>
```

You can install with [bower](http://bower.io/).

```bash
bower install threex.skymap
```

How To Use It
=============

For Skymap with a *well known urls*

```javascript
var mesh	= THREEx.createSkymap('mars')
scene.add( mesh )
```

Here is the list of well known urls, "bridge2", "escher", "park2", "park3med", "pisa", "skybox", "swedishroyalcastle", "mars". or just do this line in jsconsole.

```javascript
console.log(Object.keys(THREEx.TextureCube.WellKnownUrls));
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
