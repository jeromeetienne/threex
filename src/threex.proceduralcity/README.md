threex.proceduralcity.js
========================

It is a three.js extension to display a fully procedural city 
based on 
["city"](http://www.mrdoob.com/lab/javascript/webgl/city/01/)
, a  demo recently released by 
[@mrdoob](http://mrdoob.com).

You can try a
[demo live](https://jeromeetienne.github.io/threex.proceduralcity/examples/demo.html)
and check its 
[source](https://github.com/jeromeetienne/threex/blob/master/examples/demo.html).
Here is a 
[more basic example](http://jeromeetienne.github.io/threex.proceduralcity/examples/basic.html) 
and its [source]
[source](https://github.com/jeromeetienne/threex/blob/master/examples/basic.html).

## How To install it

You can install it manually or with
[bower](http://bower.io/).
for the manual version, first include ```threex.proceduralcity.js``` with the usual

```html
<script src='threex.proceduralcity.js'></script>
```

or with
[bower](http://bower.io/) 
you type the following to install the package.

```bash
bower install -s threex.proceduralcity=https://github.com/jeromeetienne/threex.proceduralcity/archive/master.zip
```

then you add that in your html

```html
<script src="bower_components/threex.rendererstats/threex.rendererstats.js"></script>
```

## How To Use It

Super simple, just create the instance and it will return a ```THREE.Mesh```
containing the whole city.

```javascript
var city  = new THREEx.ProceduralCity()
scene.add(city) 
```

The 
[demo](https://jeromeetienne.github.io/threex.proceduralcity/examples/demo.html)
is just this city, some lights and a fog.
This is it.
Rather cool result for something that simple.
