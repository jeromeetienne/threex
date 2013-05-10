three.nyancat
=============

threex module to get a nyancat in three.js.
It is made out of the 
[nyancat anonymous webgl demo](http://dl.dropboxusercontent.com/u/6213850/WebGL/nyanCat/nyan.html).


## How to use it

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