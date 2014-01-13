threex.toxicpproc
=================

threex.toxicpproc is a three.js extension which provide an intoxicated effect :)
It provides various levels of intoxication
```sober```,
```drunk```,
```high``` and
```wasted```.
You can easily provide that to your effect composer/


Links
=====
* DONE TODO take the smoothing from threex.badtvpproc and put it there
* DONE have some presets like threex.badtvpproc
* http://devmaster.net/posts/3079/shader-effects-refraction#tabs-3
* http://www.youtube.com/watch?v=puDY0iqHQZI
* http://www.youtube.com/watch?v=i7tpMcmdT68

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.toxicpproc/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.toxicpproc/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.toxicpproc.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.toxicpproc
```

How To Use It
=============

threex.badtvpasses.js
=====================
It build the passes for a toxic effect. It has mutiples presets which are by 
order of intoxication: ```sober```, ```drunk```, ```high``` and ```wasted```.

Create an instance

```
var badTVPasses	= new THREEx.ToxicPproc.Passes();
```

Everytime you render the scene, be sure to update it

```
toxicPasses.update(delta, now)		
```

Then you add those passes to an ```THREE.EffectComposer``` like that

```
toxicPasses.addPassesTo(composer)
```

It is possible to set a preset with the following

```
toxicPasses.setPreset('drunk')
```

To get the list of all presets

```
var presetNames	= Object.keys(THREEx.ToxicPproc.passesPreset)
console.log(presetNames)
```

threex.toxicpprocdatgui.js
==========================

It provide an easy way to fine tune ```threex.toxicpproc``` parameters
thanks to  [Dat.GUI](https://code.google.com/p/dat-gui/). 
It is interactive and simple! The typical usage is just:

```
THREEx.addToxicPasses2DatGui(badTVPasses)
```
