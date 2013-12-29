threex.flamethrower
===================

threex.flamethrower is a three.js extension which provide an flamethrower for other developpers.
Thus they can copy it and start their own extension.

TODO
====
* make webaudio.flamethrower cleaner for a webaudiox plugin
  * make it cleaner to integrate
  * no requirement on webaudiox
  * so it outputs something standard. 
* put textureutils in flamethrower namespace
* threex.flamethrowertexture.js ?
* write a basic demo for threex.flamethrowersprite.js
  * this is a sprite with .object3d
  * function to get the proper uv
* threex.flamethroweremitter.js
* flamethrower.html complete demo

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.flamethrower/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.flamethrower/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.flamethrower/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.flamethrower/blob/master/examples/requirejs.html)\] :
It does that this way, and it is cool in that case.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.flamethrower.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.flamethrower
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance	= new THREEx.Sample()
```
