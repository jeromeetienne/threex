threex.keyboardstate
====================

it is a three.js extension to keep the current state of the keyboard.
It is possible to query it at any time. No need of an event.
This is particularly convenient in loop driven case, like in
3D demos or games.

Here is the basic example 
[live](http://jeromeetienne.github.io/threex/src/threex.keyboardstate/examples/basic.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.keyboardstate/examples/basic.html).
Another one which handle [norepeat keydown event](http://jeromeetienne.github.io/threex/src/threex.keyboardstate/examples/norepeatkeydown.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.keyboardstate/examples/norepeatkeydown.html).
Another one which use it [standalone](http://jeromeetienne.github.io/threex/src/threex.keyboardstate/examples/standalone.html)
 and its 
[source](https://github.com/jeromeetienne/threex/blob/master/src/threex.keyboardstate/examples/standalone.html).

How To Install It
=================

You can install it manually. Just do 

```html
<script src='threex.keyboardstate.js'></script>
```

You can install with [bower](http://bower.io/).

```bash
bower install threex.keyboardstate
```

## How To Use It ? 

**Step 1**: Create the object

```javascript
var keyboard	= new THREEx.KeyboardState();
```

**Step 2**: Query the keyboard state

This will return true if shift and A are pressed, false otherwise

```javascript
keyboard.pressed("shift+A")
```

**Step 3**: Stop listening to the keyboard

```javascript
keyboard.destroy()
```

NOTE: this library may be nice as standaline. independant from three.js
