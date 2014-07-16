TODO
* the three.js Mirror.js isnt able to support more than 2 mirrors
    - seems to be just a sillyness in the function
    - seems easy
    - THREE.Mirror.prototype.renderWithMirror should handle an array of mirror instead
    - https://github.com/mrdoob/three.js/blob/master/examples/js/Mirror.js#L146
* how to make all that more easily reusable ?
    - does it need to be ?
* demo idea. http://i.stack.imgur.com/UEZWe.jpg infinite reflection of mirror
    - or a mirror maze

threex.water
============

threex.water is a three.js extension which provide an water for other developpers.
Thus they can copy it and start their own extension.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.water/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.water/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.water/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.water/blob/master/examples/requirejs.html)\] :
It does that this way, and it is cool in that case.

A Screenshot
============
[![screenshot](https://raw.githubusercontent.com/jeromeetienne/threex.water/master/examples/images/screenshot-threex-water-512x512.jpg)](http://jeromeetienne.github.io/threex.water/examples/basic.html)

How To Install It
=================

You can install it via script tag

```html
<script src='threex.water.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.water
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance    = new THREEx.Sample()
```
