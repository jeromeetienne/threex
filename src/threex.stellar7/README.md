threex.stella7
===================

threex.stellar7 is a three.js extension which provide stellar7 stuff. The models, the controls, the collision, all the bricks to actually do a stellar7 like game.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.stellar7/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.stellar7/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.stellar7.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.stellar7
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance	= new THREEx.Sample()
```

threex.stellar7tank.js
======================

Typical initialisation

```javascript
// create the tank
var stellar7tank	= new THREEx.Stellar7Tank()
// add the tank to the scene
scene.add( stellar7tank.object3d )
// as usual, you update it at every render
onRenderFcts.push(function(delta, now){
	stellar7tank.update(delta, now)
})
```

Exposed variables

* ```stellar7tank.gunSpeed```: to set the angular speed of the gun
* ```stellar7tank.turnSpeed```: to set the angular speed of the tank
* ```stellar7tank.moveSpeed```: to set the speed of the tank

Usefull Links
=============
* http://fightcodegame.com/docs/?


