threex.glow
===========

threex.glow makes it easy to add glowing objects into your scene.
It is a selective glow, so it is possible to have some glowing objects 
along with non glowing objects on the same scene.

## Status
stable

## Change Logs
* v1.0 initial version
  * reasonable API
  * basic demos

## FAQs
* how to make it fast
  * as the output of the glow is blurred a lot, it is possible to reduce significantly
  the size of the renderTarget without much artefacts

## Possible improvements
* to get the glow, it is cloning the geometry and render the whole scene
  * it consumes memory in cpu/gpu
  * it is doing another additional render of non-glowing object just to get the depth
  * possible to share depth map ? if so it would be possible to rerender only the glowing object and using the depth map from the first render.
