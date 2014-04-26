threex.md2character
===================

threex.md2character is a 
[three.js game extension](threejsgames.com/extensions/)
which provides a model of a monster. 
His name is 'ratmahatta' and is from quake era.
It is animated, can hold a weapon, skin may be changed. Pretty sweet.
you got **12 weapons to choose from**, **5 different skins** and **16 distinct animations**. Pretty complete!
It is easy to include in your game, maybe in a cave or a dungeon :)
It is from 
[webgl_morphtargets_md2.html three.js example](http://threejs.org/examples/webgl_morphtargets_md2.html). 
The model is make by
[Brian Collins](http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=368) and converted by
[@oosmoxiecode](https://twitter.com/#!/oosmoxiecode)'s 
[MD2 converter](http://oos.moxiecode.com/blog/2012/01/md2-to-json-converter/).

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

## threex.md2characterratmahatta.js

You typically create a ratamahatta like this

```
var ratamahatta = new THREEx.MD2CharacterRatmahatta()
scene.add(ratamahatta.character.object3d)
```

Don't forget to update it when you render with ```ratamahatta.update(delta)```.Internally, it create a character and a controls. You can use them directly.
* ```ratamahatta.character``` instance of ```THREEx.MD2Character```
* ```ratamahatta.controls``` instance of ```THREEx.MD2CharacterControls```

It has simple functions to set the skin, weapon and animations.

* ```ratamahatta.skinNames``` is the names of available skins. It has 5 different skins
```["ratamahatta", "ctf_b", "ctf_r", "dead", "gearwhore"]```
* ```ratamahatta.setSkinName(skinName)``` set the skin based on its name
* ```ratamahatta.weaponsNames``` is the names of available weapons. It has 12 animation
```["none", "weapon", "w_bfg", "w_blaster", "w_chaingun", "w_glauncher", "w_hyperblaster", "w_machinegun", "w_railgun", "w_rlauncher", "w_shotgun", "w_sshotgun"]``` 
* ```ratamahatta.setWeaponName(weaponName)``` set the weapon based on its name
* ```ratamahatta.animationNames``` is the names of available animation. It has 16 animations
```["stand", "run", "attack", "pain", "jump", "flip", "salute", "taunt", "wave", "point", "crstand", "crwalk", "crattack", "crpain", "crdeath", "death"]``` 
* ```ratamahatta.setAnimationName(animationName)``` set the animation based on its name


## threex.md2charactercontrols.js

First you create controls for your character like this

```
var controls    = new THREEx.MD2CharacterControls(character.object3d)
```

Dont forget to update it when you render with ```controls.update(delta, now)```. The character is controlled by ```controls.inputs``` properties. You just have to set them to fit your need.

* ```control.inputs.right``` is true if the character must go right
* ```control.inputs.left``` is true if the character must go left
* ```control.inputs.up``` is true if the character must go forward
* ```control.inputs.down``` is true if the character must go backward


## threex.md2character.js

It provide the base to play with the model.
It is a modified version of 
[MD2Character.js](https://github.com/mrdoob/three.js/blob/master/examples/js/MD2Character.js)
from this [webgl_morphtargets_md2.html three.js example](http://threejs.org/examples/webgl_morphtargets_md2.html). 

First you create it. 
```
var character   = new THREEx.MD2Character()
```

Dont forget to update it at every frame with a ```character.update(delta)```

* ```character.object3d``` is the THREE.Object3D container
* ```character.setWireframe(boolean)``` set the model in wireframe.
* ```character.setWeapon(weaponIndex)``` add a weapon in the character hand. ```weaponIndex``` is between 0 and 11. if -1, it removes the weapon.
* ```character.setSkin(skinIndex)``` set the skin of the character. ```skinIndex``` is between 0 and 4
* ```character.setAnimation(animationName)``` set the animation for the character. The name is one of ```["stand", "run", "attack", "pain", "jump", "flip", "salute", "taunt", "wave", "point", "crstand", "crwalk", "crattack", "crpain", "crdeath", "death"]```.
* ```character.setPlaybackRate(rate)``` set the playback rate of the animation.
* ```character.load(config)``` loads the characters
  * ```character.addEventListener('loaded', function(){})``` to be notified when the model is loaded
  * ```character.isLoaded()``` is true if the model is loaded, false otherwise




