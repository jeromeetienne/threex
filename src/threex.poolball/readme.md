threex.poolball
===============
threex.poolbal is a three.js extension to build pool balls.


this is with all the default values
```
var mesh	= THREEx.createPoolBall();
scene.add(mesh)
```

this is with custom arguments

```
var mesh	= THREEx.createPoolBall({
	ballDesc	: '0',	// the text which gonna be written on the ball
	stripped	: true,	// true if the ball must be stripped, false otherwise
	textureW	: 512	// the width/height of the created texture for this ball
});
scene.add(mesh)
```

Some ball description are already done.

* ```cue``` will return an unstripped white ball
* ```black``` will return an unstripped black ball
* ```1``` to ```9``` will assign the official colors for [nine-ball](http://en.wikipedia.org/wiki/Nine-ball) pool
