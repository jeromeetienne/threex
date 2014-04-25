threex.md2character
===================

threex.md2character is a three.js extension which provide an md2character for other developpers.
Thus they can copy it and start their own extension.

### TODO
* make the skin cachable
* make a demo with LOTS of characters all doing something differents-
    - maybe a simple maze with rock skin
    - what about some localized sound on each
    - some low altitude camera fly
    - many runing in a maze
    - some small angle directional lights to get long shadows casting
* make a select.html with all the skin and weapon
* see if there are other characters in three.js
    - i remember a superman from alteredqueue
    - and a fat ogre
    - find reference on it and put it here
    - make a 'possible enhancement' with those link



Show Don't Tell
===============
* [examples/demo.html](http://jeromeetienne.github.io/threex.md2character/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.md2character/blob/master/examples/demo.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/select.html](http://jeromeetienne.github.io/threex.md2character/examples/select.html)
\[[view source](https://github.com/jeromeetienne/threex.md2character/blob/master/examples/select.html)\] :
It shows all the possibilities for the skins, the weapons and the animations.
* [examples/ratmahattaplayer.html](http://jeromeetienne.github.io/threex.md2character/examples/ratmahattaplayer.html)
\[[view source](https://github.com/jeromeetienne/threex.md2character/blob/master/examples/ratmahattaplayer.html)\] :
It shows how to controls the mesh as if it was a player in a game with input
in the keyboard wasd or arrows keys.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.md2character.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.md2character
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance    = new THREEx.Sample()
```