threex.windowresize
===================

threex.windowresize is a three.js extension to help you handle window resize.


## How To Use

You just have to instanciate the object. Then whenever you resize the window,
it will resize the renderer canvas and adjust the camera accordingly.

```
var winResize	= new THREEx.WindowResize(renderer, camera)
```

If you need to destroy it at one point, just do ```winResize.destroy();```.
It fit well with devicePixelRatio, see an example below

```
renderer.devicePixelRatio	= 1/4
winResize.trigger()
```