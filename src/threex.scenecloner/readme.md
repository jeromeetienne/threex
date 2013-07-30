threex.scenemirror.js
=====================
it helps you mirror one scene in another. it is usefull in some situations.
You can need it in some post processing operations: like in this
[glow by bkcore](http://bkcore.com/blog/3d/webgl-three-js-animated-selective-glow.html).
or because you need to have 2 rendering of the same scene:
like in
[voodoo.js](http://www.voodoojs.com/),
one scene in front of the web page,
another behind the web page.

It is possible to be notified when an object is added/removed from the mirrored scene.
It is usefull to customize the object in the mirror scene.

You can see a basic example 
[live](http://jeromeetienne.github.io/threex/src/threex.scenecloner/examples/basic.html)
and its
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.scenecloner/examples/basic.html).
You can see a examples with threex.glow
[live](http://jeromeetienne.github.io/threex/src/threex.scenecloner/examples/glow.html)
and its
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.scenecloner/examples/glow.html).

## How to Use It

Here is a typical usage. First we init the scene mirror.

```javascript
var sceneMirror	= new THREEx.SceneMirror(scene)
```

Then for each object, one need to ```.add()``` it in the scene mirror before it is 
added/removed to the main.

```javascript
sceneMirror.add(mesh)
```

Now when you do ```scene.add(mesh)```, the mesh will be cloned and added to the mirrored scene. You can access it by ```sceneMirror.dstScene```

This is it 

### detailled contructor options

```javascript
var sceneMirror	= new THREEx.SceneMirror(scene, opts)
```

* ```opts``` is optional
* ```opts.labelSuffix``` it is the name of this scene mirror. is optional.
* ```opts.onAdded``` is a callback which is notified every time add object is mirrored.
This is a good place add a modifier that will be run on each object.
* ```opts.dstScene``` the destination scene to use for the mirror.

Let's see a more complex usage which change the material of the object in the mirrored scene.
It will modify the mirrored object to have wireframe material.

```javascript
var sceneMirror	= new THREEx.SceneMirror(scene, {
	onAdded	: function(dstObject, srcObject){
		dstObject.material	= new THREE.MeshBasicMaterial({
			wireframe	: true,
		});
	},
})
```

### TODO
* to implement ```.remove()``` .. couch