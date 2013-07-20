threex.scenemirror.js
=====================
it helps you mirror one scene in another. it is usefull in some situations.
e.g. in this 
[bkcore glow](http://bkcore.com/blog/3d/webgl-three-js-animated-selective-glow.html) it has 2 scenes mirrors.
or in 
[voodoo.js](http://www.voodoojs.com/).
It has 2 mirrored scenes, one in front of the web page,
another behind the web page.

It is possible to modify the cloned object to change its property.

to init the scene mirror

```javascript
var sceneMirror	= new THREEx.SceneMirror(scene)
```

For each object, one need to ```.add()``` it in the scene mirror.

```javascript
sceneMirror.add(mesh)
```

```sceneMirror.dstScene``` is the mirrored scene


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