threex.iomo
===========

threex.iomo is a [threex](http://jeromeetienne.github.io/threex/) extension for three.js which provides a realistic physics easy to include in your own games.
It contains helpers for [oimo.js](https://github.com/lo-th/Oimo.js) physics library.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.iomo/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.iomo/blob/master/examples/basic.html)\] :
It shows a bunch of cube and sphere falling on a ground.

How To Install It
=================

You can install it via script tag

```
 <script src='threex.iomo.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```
bower install threex.iomo
```

How To Use It
=============

Well first you need to create a iomo.js world. You do that like this

```
var world	= new OIMO.World()
```

Then, at every frame, update your mesh position/rotation.

```
world.step()
```

Then you need to create physics bodies and make them move

## .createBodyFromMesh()

It will create the ```IOMO.Body``` from a three.js mesh you give it. 
Currently it support ```THREE.CubeGeometry``` and ```THREE.SphereGeometry```. First create a normal ```THREE.Mesh```

```
var geometry	= new THREE.CubeGeometry(1,1,1)
var material	= new THREE.MeshNormalMaterial()
var mesh	= new THREE.Mesh( geometry, material )
scene.add(mesh)
```

Then you create the ```IOMO.Body``` for it

```	
var body	= THREEx.Iomo.createBodyFromMesh(world, mesh)
```

## .Body2MeshUpdater()

It will update the position/rotation of a ```THREE.Mesh``` 
based on a position/rotation of a ```IOMO.Body```. You need
this to see your meshes moves according to iomo.js physics.
First you create the object

```
var updater	= new THREEx.Iomo.Body2MeshUpdater(body, mesh)
```

Then, at every frame, update your mesh position/rotation.

```
updater.update()
```


## .Stats()

It will display statistic from iomo.js, it may be useful to know what is going on.
It acts very much like 
[mrdoob's stats]()
or 
[threex.rendererstats]().

```
var iomoStats	= new THREEx.Iomo.Stats(world)
document.body.appendChild(iomoStats.domElement)
```

Then, at every frame, update it.

```
iomoStats.update()
```





















