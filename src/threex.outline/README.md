threex.outline
=============

threex.outline is a 
[threex game extension for three.js](http://www.threejsgames.com/extensions/).
It provides an outline for your object, very usefull to show the player
that an object is selected. Say you want to select a box, you give
the box mesh to THREEx.Outline and it will draw the outline around your box.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.outline/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.outline/blob/master/examples/basic.html)\] :
It shows a cube with an outline feature, and that one which is coded like that.

A Screenshot
============
[![screenshot](https://raw.githubusercontent.com/jeromeetienne/threex.outline/master/examples/images/screenshot-threex-outline-512x512.jpg)](http://jeromeetienne.github.io/threex.outline/examples/basic.html)

How To Install It
=================

You can install it via script tag

```html
<script src='threex.outline.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.outline
```

How To Use It
=============

Say you got a ```mesh``` containing the object you want to outline.
First you create the outline object like that

```javascript
// determine the thickness of the outline you want
var thickness = 8
// create the outline object
var outline = new THREEx.Outline(mesh, renderer, camera, thickness)
```

Don't forget to update it each time on each frame.

```
outline.update()
```

Let me explains how parameters are used.
The ```renderer``` is required to know the height in pixel of the rendering canvas. It allows to keep the outline tickness to be constant no matter how far is the ```mesh```. ```camera``` is your current camera and is needed to know the distance between the mesh and and the camera.

