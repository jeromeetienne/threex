threex.cannonjs
===============

```threex.cannonjs``` is a wrapper to ease access between cannon.js and three.js

## Status
Early

## how to use it

Init the physics world
```
var physicsWorld= new THREEx.CannonWorld().start();
```

create a physics body from a ```THREE.Mesh```
```
var physicsBody	= new THREEx.CannonBody(mesh)
```

add this physics body to our physics world and keep updating it

```
physicsWorld.add(physicsBody)
updateFcts.push(function(delta, now){
	physicsBody.update(delta, now);		
});
```
	
one may wish to setup an initial velocity
```
physicsBody.origin.angularVelocity.set(0,2,0);
```

## TODO
* find a good API
  * there is a part per mesh
  * there is another part at the world level
  * 