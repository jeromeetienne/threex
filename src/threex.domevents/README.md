threex.domevents
================

threex.domevents is a three.js extension which provide an domevents for other developpers.
Thus they can copy it and start their own extension.

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

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance	= new THREEx.Sample()
```


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

```linkify.destroy()``` to stop listening on those events

The exposed properties are 

* ```linkify.underline``` is the mesh for the underline
* ```linkify.eventTarget``` is the model on which the domEvents are bound


## TODO
* find a good demo
  * test all events in the demo
  * why not the usual teapots ones ?