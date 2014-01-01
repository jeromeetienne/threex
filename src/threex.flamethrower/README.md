threex.flamethrower
===================

threex.flamethrower is a three.js extension which provide an flamethrower for other developpers.
Thus they can copy it and start their own extension.

TODO
====
* DONE remove the globals, check with require.js
* make sounds more portable
  * likely to be redone completly on top of webaudiox
  * WebAudiox.FlameThrowerSound(context, destination)
  * .start(), .stop()
  * TODO make it localizable

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
* [examples/flamethrowerfull.html](http://jeromeetienne.github.io/threex.flamethrower/examples/flamethrowerfull.html)
\[[view source](https://github.com/jeromeetienne/threex.flamethrower/blob/master/examples/flamethrowerfull.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/sprite.html](http://jeromeetienne.github.io/threex.flamethrower/examples/sprite.html)
\[[view source](https://github.com/jeromeetienne/threex.flamethrower/blob/master/examples/sprite.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.flamethrower/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.flamethrower/blob/master/examples/requirejs.html)\] :
It does that this way, and it is cool in that case.
* [examples/flamethrower-manual.html](http://jeromeetienne.github.io/threex.flamethrower/examples/flamethrower-manual.html)
\[[view source](https://github.com/jeromeetienne/threex.flamethrower/blob/master/examples/flamethrower-manual.html)\] :
It does a flamethrowerfull but manually, so no dependancy.


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

create the flamethrower full

```
// source position
var position	= new THREE.Vector3(-4,0,-3)
// velocity
var velocity	= new THREE.Vector3(7, 0, 0)
var flameFull	= new THREEx.FlameThrowerFull(position, velocity, scene, function(){
	// function notified when all is loaded
	...
})
```

to start the flame thrower

```		
flameFull.start()
```

to stop the flame thrower

```
flameFull.stop()
```
