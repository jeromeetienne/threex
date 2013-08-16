threex.cannonjs
===============

```threex.cannonjs``` is a wrapper to ease access between
[cannon.js](http://cannonjs.org/)
and
[three.js](http://threejs.org/).


## how to use it

Init the physics world
```
var worldx	= new THREEx.CannonWorld().start();
```

create a physics body from a ```THREE.Mesh```
```
var bodyx	= new THREEx.CannonBody(mesh)
```

add this physics body to our physics world and keep updating it

```
worldx	.add(bodyx)
updateFcts.push(function(delta, now){
	bodyx.update(delta, now);		
});
```
	
one may wish to setup an initial velocity
```
bodyx.body.angularVelocity.set(0,2,0);
```
