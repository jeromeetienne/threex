threex.game2d
=============
* display 2d sprite with three.js
* be close to three.js
  * some helpers
  
* maybe just doing an orthographic + fullscreen plane + own shader ?
  * to have full perf. like minimized draw call
* should it be Particles system ?
  * https://github.com/mrdoob/three.js/blob/master/examples/webgl_custom_attributes_particles.html
  * no you need actual quads
* so your own geometry
  * 2 face3 per quad
  * UV 
* likely a buffer geomety for faster update
