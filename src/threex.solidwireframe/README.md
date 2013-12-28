threex.solidwireframe
===================

threex.solidwireframe is a three.js extension which provide an solid wireframe looks.
It is directly take from a ["webgl_materials_wireframe"](http://threejs.org/examples/webgl_materials_wireframe.html) three.js examples.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.solidwireframe/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.solidwireframe/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.solidwireframe.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.solidwireframe
```

How To Use It
=============

Here is the basic usage.

```javascript
var geometry	= new THREE.CubeGeometry( 1, 1, 1);
var material	= new THREEx.SolidWireframeMaterial(geometry)
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );
```
