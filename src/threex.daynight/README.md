# threex.daynight

threex.daynight is a three.js extension which provide an daynight cycle.
It is easy to include in in your own game.
It is from this
[shaders oceans](http://webgl.steins-aperture.fr/webgl_shaders_ocean.html).

# Show Don't Tell
* [examples/basic.html](http://jeromeetienne.github.io/threex.daynight/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.daynight/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.

# How To Install It

You can install it via script tag

```html
 <script src='threex.daynight.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.daynight
```

# How To Use It

The day-night cycle is composed of 3 parts:

* the sun sphere: the physical sphere representing the sun
* the sun light: the light projected from the sun
* the sky dom: the sky dom aka what you see above your head during sunny days.

Each of them may be updated according to current ```sunAngle```

## THREEx.DayNight.SunSphere

It handles the color and moving of the sun sphere. 
First you create it and add it to your scene.

```
var sunSphere	= new THREEx.DayNight.SunSphere()
scene.add( sunSphere.object3d )
```

Everytime you want to update it, pass it the current ```sunAngle```

```
sunSphere.update(sunAngle)
```


## THREEx.DayNight.SunLight

It handles the directional light from the sun. 
First you create it, then you add it to your scene.

```
var sunLight	= new THREEx.DayNight.SunLight()
scene.add( sunLight.object3d )
```

Everytime you want to update it, pass it the current ```sunAngle```


```
sunLight.update(sunAngle)
```

## THREEx.DayNight.SkyDom

IT Handles the sky dom and update its change of colors.
First you create it, then you add it to your scene.

```
var skydom	= new THREEx.DayNight.Skydom()
scene.add( skydom.object3d )
```

Everytime you want to update it, pass it the current ```sunAngle```

```
skydom.update(sunAngle)
```

## Handle sunAngle

As sunAngle is asked everywhere, here is a simple way to handle it

```
// begining position
var sunAngle = -1/6*Math.PI*2;
// the day duraction in seconds
var dayDuration	= 10
// then you periodically update it
onRenderFcts.push(function(delta, now){
	sunAngle	+= delta/dayDuration * Math.PI*2
})
```
