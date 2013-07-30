threex.lighting
===============
threex.lighting is a three.js extension which provides various standard ligthings:
the typical [three point lighting](http://en.wikipedia.org/wiki/Three-point_lighting)
or a sunset lighting. Nothing big or special in this extension.
This is mainly educational purpose or for starting your project fast.

Here is the basic example 
[live](http://jeromeetienne.github.io/threex/src/threex.basiclighting/examples/basic.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.basiclighting/examples/basic.html).
There is a [demo live](http://jeromeetienne.github.io/threex/src/threex.basiclighting/examples/demo.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.basiclighting/examples/demo.html).

## How to Use It

create a three point lighting

```javascript
var lighting	= new THREEx.ThreePointsLighting()
scene.add(lighting)
```

create a sun set lighting

```javascript
var lighting	= new THREEx.SunSetLighting()
scene.add(lighting)
```

