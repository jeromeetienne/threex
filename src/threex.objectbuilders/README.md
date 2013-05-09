threex.objectbuilders

it is an extension for three.js

it aims to m

```
THREEx.createCube().addTo(ctx)
```

```
THREEx.createMesh(mesh).translateX(2).scaleBy(2)
```

```
THREEx.createMesh(mesh)
	.translateX(2)
	.scaleBy(2)
	.geometry()
		.rotationY(Math.PI/2)
		.normalize()
		.back()
	.material()
		.color('pink')
		.back()
```

## FAQs

### rename tquery.creators
* THREEx.Creator(mesh)
* threex.creator = module name
