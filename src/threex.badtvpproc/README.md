threex.badtv
===================

threex.badtv is a three.js extension which provide an badtv effect. It is a post
processing cumulating various effects.
It is from the excelent [badtv demo](http://www.airtightinteractive.com/demos/js/badtvshader/)
of [@felixturner](https://twitter.com/felixturner).
You can see more of what he does on
[his blog](http://www.airtightinteractive.com/news).

Status: super early

TODO
====
* TODO change to BatTVPasses.params.badTV
* BadTVPasses.smoothTransition	= true
* do an examples from threex boilerplate
* some shader are the same as in three.js distribution. DO NOT DUPLICATE code
  * RGBShiftShader
  * FilmShader
* do a bad tv demo with webaudio API sound
  * find the sound on freesounds
  * use tween.js for animation
* DONE do threex.badtvdatgui.js 
  * see threex.glowkeycolor.postprocdatgui.js or others
* DONE how to update the time in the shader
  * .update() function ?
  * isnt it already done by composer ?



Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.badtv/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.badtv/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.badtv/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.badtv/blob/master/examples/requirejs.html)\] :
It does that this way, and it is cool in that case.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.badtv.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.badtv
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance	= new THREEx.Sample()
```
