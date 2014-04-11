threex.pacman
===================

threex.pacman is a three.js extension which provide pacman models. 
They are procedurally generated.
It has the 3 typical characters you find in pacman: pacman itself obviously,
the ghosts which follow you, and the ghost eyes when it has been eat by pacman.


Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.pacman/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.pacman/blob/master/examples/basic.html)\] :
It shows 3 basic characters

How To Install It
=================

You can install it via script tag

```html
<script src='threex.pacman.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.pacman
```

How To Use It
=============

You create a mesh like this. It will create a pacman by default.

```javascript
var mesh	= new THREEx.Pacman()
scene.add(mesh)
```

It is possible to add options to tune the created mesh.


* ```options.shape``` is the shape of the mesh.
  It is one of ```pacman```, ```ghost or ```eyes```.
  It defaults to ```pacman```
* ```options.face``` is the type of face of the mesh.
  It is one of ```happy```, ```hurt```, ```angry``` or ```pupil```
  It defaults to ```happy```
* ```options.color``` is the canvas color of the mesh.
  It defaults to ```"#ffff00"```
* ```options.text``` is the text written on the back of the mesh.
  It defaults to ```pucky```
* ```options.fontSize``` is the size of the font used to write the text.
  It defaults to "40pt"
* ```options.shadow``` is a boolean to enable/disable shadow below the mesh.
  It default to true
* ```options.canvasW``` is the size of the canvas used to generate the texture.


You have already seen how to generate a pacman. 
Here is how to generate eyes for example

```
var eyes	= new THREEx.Pacman({
	face	: 'pupil',
	shape	: 'eyes',
	text	: '',
	color	: '#ffffff'
})
scene.add(eyes)
```

Here is how to generate a ghost.

```
var ghost	= new THREEx.Pacman({
	shape	: 'ghost',
	text	: 'El jeje',
})
scene.add(ghost)
```