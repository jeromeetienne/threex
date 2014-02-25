threex.domevents
================

threex.domevents is a three.js extension which provide dom events inside your 3d scene.
Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
The semantic is the same too, which makes it all very easy to learn.
Currently, the available events are
[click, dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html),
[mouseover and mouse out](http://www.quirksmode.org/dom/events/mouseover.html).


Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.domevents/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.domevents/blob/master/examples/basic.html)\] :
It shows a simple usage of ```threex..
* [examples/linkify.html](http://jeromeetienne.github.io/threex.domevents/examples/linkify.html)
\[[view source](https://github.com/jeromeetienne/threex.domevents/blob/master/examples/linkify.html)\] :
It demonstrate a usage of ```threex.linkify.js```

How To Install It
=================

You can install it via script tag

```html
<script src='threex.domevents.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.domevents
```

How To Use It
=============

First you need to instanciate the layer, like this.

```
var domEvents	= new THREEx.DomEvents(camera, renderer.domElement)
```

Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
The semantic is the same too.
Currently, the available events are
[click, dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html),
[mouseover and mouse out](http://www.quirksmode.org/dom/events/mouseover.html).
Then you bind an event on a mesh like this

```
domEvents.addEventListener(mesh, 'click', function(event){
	console.log('you clicked on the mesh')
}, false)
```

You can remove an event listener too, here is the whole cycle

```
// define the callback
function callback(event){
	console.log('you clicked on the mesh')	
}

// add an event listener for this callback
domEvents.addEventListener(mesh, 'click', callback, false)

// remove an event listener for this callback
domEvents.removeEventListener(mesh, 'click', callback, false)
```

If the camera changes, you can use ```domEvents.camera(camera)``` to set the new one.
Now that you got the 

## THREEx.Linkify.js

This helper will linkify any object3d you got.
Here linkify is the fact to act as a ```<a>``` tag would behave.
If you hover the mouse over it, the pointer is changed to become 
[an hand](http://en.wikipedia.org/wiki/Pointer_\(graphical_user_interfaces\)),
and you got 
[text decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration).
If you click on the object, it will open a new tab with the url your specified.
It is that simple.

```javascript
var url		= 'http://jeromeetienne.github.io/threex/'
var linkify	= THREEx.Linkify(domEvents, mesh, url, true)
```

The parameters are 
* ```domEvents```: an instance of ```THREEx.DomEvents```
* ```mesh```: an instance of ```THREE.Mesh```
* ```url```: a string of the url
* ```withBoundingBox```: true if you bind the bounding box and not the mesh itself. It 
may be useful when your mesh is complex. useful because it is faster to test for 
simple mesh, usefull as it make the detections less flacky for the users for complex meshes.


Additionnaly you can use ```linkify.destroy()``` to stop listening on those events.
The exposed properties are 

* ```linkify.underline``` is the mesh for the underline
* ```linkify.eventTarget``` is the model on which the domEvents are bound


## TODO
* find a good demo
  * test all events in the demo
  * why not the usual teapots ones ?