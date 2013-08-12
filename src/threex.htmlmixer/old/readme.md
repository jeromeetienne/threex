threex.htmlmixer
================


Notes about possible API
========================

instanciate the first object

```javascript
var htmlMixer	= new THREEx.Htmlmixer(???);
```


render it

```javascript
htmlMixer.render(scene, camera)
```

create an plane

```javascript
var mixerPlane	= htmlMixer.createPlane(element)
scene.add(mixerPlane.object3d)
```

NOTE: use onAdded event to mirror it internally

There is a shortcut for iframe as it is a common usecas

```javascript
var mixerPlane	= htmlMixer.createPlaneFromIframe(url)
scene.add(mixerPlane.object3d)
```
