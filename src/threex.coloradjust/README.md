threex.coloradjust
===================

It is a 
[threex](http://jeromeetienne.github.io/threex/) extension 
for 
[three.js](http://threejs.org)
which provide an color adjustement based on a 3d texture.
It is very flexible, you can build those textures with any image editing software.
It is from
[color-adjust demo](http://webglsamples.googlecode.com/hg/color-adjust/color-adjust.html)
by
[greggman](http://greggman.com/).
Here is a [video](http://www.youtube.com/watch?v=rfQ8rKGTVlg#t=25m03s)
where you can see greggman explaining the technic.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.coloradjust/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.coloradjust/blob/master/examples/basic.html)\] :
It shows how to use the ```THREEx.ColorAdjust.Renderer```.
It changes the color cube randomly every 3-seconds just to put some animations
* [examples/demo.html](http://jeromeetienne.github.io/threex.coloradjust/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.coloradjust/blob/master/examples/demo.html)\] :
It show an video with the adjusted colors. 
You can play with it to get a better feeling of what this effect can do for you.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.coloradjust.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.coloradjust
```

How To Use It
=============

First step is to create the object.

```javascript
var colorRenderer= new THREEx.ColorAdjust.Renderer(renderer, scene, camera);
```

Be sure to update it in your render loop

```javascript
colorRenderer.update(delta, now)
```

You can set the color cube you want amoung the 22 available. It default to ```default```.
Here is the full list of available colors adjustement : default,
monochrome,
sepia,
saturated,
posterize,
inverse,
color-negative,
high-contrast-bw,
funky-contrast,
nightvision,
thermal,
black-white,
hue-plus-60,
hue-plus-180,
hue-minus-60,
red-to-cyan,
blues,
infrared,
radioactive,
goolgey,
bgy.

```javascript
colorRenderer.setColorCube('default')	
```

There is a smooth linear transition between the old colors and the new ones. 
You can tune the delay like this.
	
```javascript
// set the transition delay to 2 seconds
colorRenderer.delay	= 2;
```

