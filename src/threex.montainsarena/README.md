threex.montainsarena
====================

It is a 
[threex](http://jeromeetienne.github.io/threex/) module 
for 
[three.js](http://threejs.org)
which provide an montainsarena.
This is ultra simple module.
It may be usefull when starting a new project or for educational purpose.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.montainsarena/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.montainsarena/blob/master/examples/basic.html)\] :
It shows how to include a montains arena into your own code.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.montainsarena.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.montainsarena
```

How To Use It
=============

First you instanciate the object

```javascript
var mesh	= new THREEx.MontainsArena()
scene.add(mesh)
```

Possible Improvements
=====================
* merge the geometry to make it faster to run
* expose the internal options to the user



