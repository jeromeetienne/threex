Rendering loop ala vendor.js
============================

This text presents how to code a rendering loop ala vendor.js.
Aka no dependancy at all. 

You can use it for your rendering loop, for physics loop.
You can use it as main loop, or as way to update your object.
It is simple and versatile.

### Declaration 

First 

```javascript
var updateFcts	= [];
```

### add/remove function in the looop

to push a function in the loop

```
updateFcts.push(function callback(delta, now){
	// ...
})
```

to remove a function from the loop

```javascript
updateFcts.splice(updateFcts.indexOf(callback),1)
```

### loop on requestAnimationFrame

to run the loop on ```requestAnimationFrame``` events - use

```javascript
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	updateFcts.forEach(function(updateFn){
		updateFn(deltaMsec/1000, nowMsec/1000)
	})
})
```

### loop periodically

to run periodically, usefull for physics loop

```javascript
var period	= 1000/60
setInterval(function(){
	updateFcts.forEach(function(updateFn){
		updateFn(period/1000, Date.now()/1000)
	})	
}, period);
```

### use it to update your object

to have an loop in your object. usefull to link it another loop

```
this.update	= function(delta, now){
	updateFcts.forEach(function(updateFct){
		updateFct(delta, now)
	})
}
```

