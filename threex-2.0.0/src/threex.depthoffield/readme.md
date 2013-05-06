threex.depthoffield
===================

Provide a tunable depth of field to your scene


## How to use it ?

first you initialize it

```
var depthOfField= new THREEx.DepthOfField(renderer)
```

then you call this function everytime you want to render it

```
depthOfField.render(scene, camera)
```

Becareful with the camera far distance... it greatly affects the precision of the
```THREE.MeshDepthMaterial``` rendering. Keep it close to the minimum.
