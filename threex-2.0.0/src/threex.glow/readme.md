threex.glow
===========

threex.glow makes it easy to add glowing objects into your scene.
It is a selective glow, so it is possible to have some glowing objects 
along with non glowing objects on the same scene.

**stage**: super early

## TODO 
* find a proper API
  * clone the scenegraph
    * how to do it ?
  * how to tune the material per glowing object
    * part of the cloning scenegraph issue ?
  * how to mix the glowing ```renderTarget``` with the normal input
    * simply expose the .renderTarget and up to the caller to blend it ?
* make it independant of threex.effectcomposer
  * simple, use three.js directly
