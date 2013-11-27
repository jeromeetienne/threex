three.nyancat
=============

threex module to get a nyancat in three.js.
It is made out of the 
[nyancat anonymous webgl demo](http://dl.dropboxusercontent.com/u/6213850/WebGL/nyanCat/nyan.html).
It is released under MIT license.

## How To install it

You can install it manually or with
[bower](http://bower.io/).
for the manual version, first include ```threex.nyancat.js``` with the usual

```html
<script src='threex.nyancat.js'></script>
<script src='threex.nyancatrainbow.js'></script>
<script src='threex.nyancatsound.js'></script>
<script src='threex.nyancatstars.js'></script>
```

or with
[bower](http://bower.io/) 
you type the following to install the package.

```bash
bower install -s threex.nyancat=https://github.com/jeromeetienne/threex.nyancat/archive/master.zip
```

then you add that in your html

```html
<script src="bower_components/threex.nyancat/threex.nyancat.js"></script>
<script src="bower_components/threex.nyancat/threex.nyancatrainbow.js"></script>
<script src="bower_components/threex.nyancat/threex.nyancatsound.js"></script>
<script src="bower_components/threex.nyancat/threex.nyancatstars.js"></script>
```



## How to use it

You can find running code in ```examples/basic.html```.
[demo live](http://jeromeetienne.github.io/threex/src/threex.nyancat/examples/basic.html)

### threex.nyancat.js
To get poptart, the cat itself, include ```threex.nyancat.js``` and do
```
	var nyanCat	= new THREEx.NyanCat()
	scene.add( nyanCat.container )
	updateFcts.push(function(delta, now){
		if( paused )	return
		nyanCat.update(delta, now)
	})
```

### threex.nyancatsound.js

To get music, include ```threex.nyancatsound.js``` and do

```
	var sound	= new THREEx.NyanCatSound()
	var paused	= false;	
	document.body.addEventListener('mousedown', function(){
		paused	= paused ? false : true
		sound.toggle()
	})
```

### threex.nyancatstars.js

To get the stars, include ```threex.nyancatstars.js``` and do

```	
	var nyanStars	= new THREEx.NyanCatStars()
	scene.add( nyanStars.container )
	updateFcts.push(function(delta, now){
		if( paused )	return 
		nyanStars.update(delta, now)
	})

```

### threex.nyancatrainbow.js

To get the stars, include ```threex.nyancatrainbow.js``` and do

```
	var nyanRainbow	= new THREEx.NyanCatRainbow()
	scene.add( nyanRainbow.container )
	updateFcts.push(function(delta, now){
		if( paused )	return
		nyanRainbow.update(delta, now)
	})
```