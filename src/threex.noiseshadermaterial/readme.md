threex.noiseshadermaterial.js
=============================
it provides a ```THREE.ShaderMaterial``` preconfigured to display 3d noise.
all parameters are exposed. you can tweek them endlessly to fit your need.
It is all procedural with perlin3d so no download, full random.
released under MIT license.

Here is the basic example 
[live](http://jeromeetienne.github.io/jeromeetienne/threex/src/threex.noiseshadermaterial/examples/basic.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.noiseshadermaterial/examples/basic.html).
Here is the lsd psychedlic kindof example 
[live](http://jeromeetienne.github.io/jeromeetienne/threex/src/threex.noiseshadermaterial/examples/lsd.html)
 and its 
[source](http://github.com/jeromeetienne/threex/blob/master/src/threex.noiseshadermaterial/examples/lsd.html).
Here is an volumetric cloud genereated by a perlin/simplex3d, it is 
[live](http://jeromeetienne.github.io/jeromeetienne/threex/src/threex.noiseshadermaterial/examples/volumetric-cloud-procedural.html)
 and its 
[source](http://github.com/jeromeetienne/threex/blob/master/src/threex.noiseshadermaterial/examples/volumetric-cloud-procedural.html).

## How To Install

You can install it manually or with
[bower](http://bower.io/).
for the manual version, first include ```threex.noiseshadermaterial.js``` with the usual

```html
<script src='threex.noiseshadermaterial.js'></script>
```

or with
[bower](http://bower.io/) 
you type the following to install the package.

```bash
bower install -s threex.noiseshadermaterial=https://github.com/jeromeetienne/threex.noiseshadermaterial/archive/master.zip
```

then you add that in your html

```html
<script src="bower_components/threex.noiseshadermaterial/threex.noiseshadermaterial.js"></script>
```


## Usage

here is a typical usage

```javascript
var geometry	= new THREE.PlaneGeometry(1,1);
var material	= new THREEx.NoiseShaderMaterial()
var mesh	= new THREE.Mesh( geometry, material );
```

The ```new THREEx.NoiseShaderMaterial()``` create a ```THREE.ShaderMaterial```
with all the preconfiguration to make perlin3d animations.
the heightmap kindof stuff

You can tweeks various parameters to animate the perlin3d 
This one is to change time. It will change the topology of the map itself.

```javascript
material.uniforms[ "time" ].value	+= delta/5;
```

This is the scale applied to the virtual texture UV.
You typically use that to be closer to the height map, or higher in the sky,

```javascript
material.uniforms[ "scale" ].value.y	+= delta/5;
```

This is the offset in the virtual texture.

```javascript
material.uniforms[ "offset" ].value.x	+= delta/10;
```

You can even provide your own piece of fragment shader to do your own effects.
lsd example is a good example for that.
Here it is 
[live](http://jeromeetienne.github.io/jeromeetienne/threex/src/threex.noiseshadermaterial/examples/lsd.html)
 and its 
[source](http://github.com/jeromeetienne/threex/blob/master/src/threex.noiseshadermaterial/examples/lsd.html).

