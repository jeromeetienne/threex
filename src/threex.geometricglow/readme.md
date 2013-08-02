threex.geometricglow
====================

threex.geometricglow is a three.js extension to make any object glow.
It is done at the geometry level. An important feature which provide 
multiple advantages.

* the 'glow' is a mesh. so you can add it in your scene whenever you want.
* It isnt in screenspace. so simpler to handle and easier to tune
  * screenspace glow may have a single glow level no matter the depth
    of the glowing object.


```
var glowMesh	= new THREEx.GlowMesh(mesh);
mesh.add(glowMesh)
```