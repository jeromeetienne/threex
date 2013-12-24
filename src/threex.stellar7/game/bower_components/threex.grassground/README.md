threex.grassground
==================

It is a 
[threex](http://jeromeetienne.github.io/threex/) module 
for 
[three.js](http://threejs.org)
which provide an grassground. This is an very simple, it may be usefull
when starting a new project, or for educational purpose.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.grassground/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.grassground/blob/master/examples/basic.html)\] :
It shows how to include a grass ground into your own code.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.grassground.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.grassground
```

How To Use It
=============

First you instanciate the object

```javascript
var groundMesh	= new THREEx.GrassGround()
scene.add(groundMesh)
```

There are some options arguments that you can tune to fix your own needs.

```
var groundMesh	= new THREEx.GrassGround({
	width		: 1,	// the width of the mesh, default to 1
	height		: 1, 	// the height of the mesh, default to 1
	segmentsW	: 1,	// the number of segment in the width, default to 1
	segmentsH	: 1,	// the number of segment in the height, default to 1
	repeatX		: 1,	// the number of time the texture is repeated in X, default to 1
	repeatY		: 1,	// the number of time the texture is repeated in Y, default to 1
	anisotropy	: 16,	// the anisotropy applied to the texture, default to 16
})
```











