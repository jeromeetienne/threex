threex.objcoord
===============

threex.objcoord is a three.js module which does the coordinates conversion for you.
You can get ```.worldPosition``` of 3d objects, their ```.screenPosition``` or even
their ```.cssPosition```! So you can put any domelement on a 3d object and have it
follow it. Like a name for your avatars. 

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.objcoord/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.objcoord/blob/master/examples/basic.html)\] :
It shows the basic of the module. Likely the first thing to look at.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.objcoord.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.objcoord
```

How To Use It
=============

## THREEx.ObjCoord.worldPosition(object3d)

This function gives you the world position of a given ```THREE.Object3D```.
So it is a ```THREE.Vector3``` using your scene position as origin.

```
var position	= THREEx.ObjCoord.worldPosition(object3d)
console.log(position)
// ... display the world position x,y,z of the object3d
```

## THREEx.ObjCoord.screenPosition(object3d, camera)

this function gives your the screen coordinates of a given object3d.
Screen coordinates is -1,-1 on top-left, and +1,+1 in bottom right of the screen.
(TODO find a reference)

```
var position	= THREEx.ObjCoord.screenPosition	= function(object3d, camera){
console.log(position)
// ... display the position in screen coordinates of the object3d
```

## THREEx.ObjCoord.cssPosition(object3d, camera, renderer)

Suppose you got a 3d object on your scene. 
And you want the css position matching the position of this object. 
This function does exclatly this for you :)

Let's see how to use it. First let's create the dom element.
Note the 'position: absolute;'

```
var element	= document.createElement('div')
document.body.appendChild(element)
element.innerHTML	= 'threex';	
element.style.position	= 'absolute'
```

Now we compute the css position and update the element's style to make it match.

```
var position		= THREEx.ObjCoord.cssPosition(mesh, camera,renderer)
element.style.left	= (position.x-element.offsetWidth /2)+'px';
element.style.top	= (position.y-element.offsetHeight/2)+'px';
```

<iframe src='http://jeromeetienne.github.io/threex/src/threex.objectcoord/examples/basic.html' style='width:100%; height: 480px'></iframe>







