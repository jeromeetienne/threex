threex.flocking
===============

## TODO

* do a threex.physicsControls.js
    - with the base of threex.flockingcontrols.js
    - with position, acceleration, velocity, damping
* have threex.flockingcontrols.js on top of threex.physicsControls.js

* put a weight for each force cohesion/alignement/separation
* when estimating neighboors, do a weighted average using a tween function
* make debug info

## Notes
* boid are based from bird demo by mrdoob
  * [demo](http://threejs.org/examples/canvas_geometry_birds.html)

* threex.magnetcontrols.js arch is nice
  * port the flocking on it

* it is possible to make it pluginable ?

* good tutorial on flocking
  * http://harry.me/blog/2011/02/17/neat-algorithms-flocking/



===

QF-MichaelK: jetienne: Ah, cool, you might want to add some "maximum angle change" to prevent jitter, also, I think some sort of bimodal influence with a sweet spot might work good, haven't tried any of that, but thought of it during a flocking lecture I audited...

QF-MichaelK: jetienne: the jitter ends up being really annoying, I think there should be some sort of stable well, where they don't tend to be influenced much in it... you could probably calculate it using splines