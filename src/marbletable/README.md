demo.poollabyrinth
==================

marble labyrinth with realistic physics


## TODOs

* levels
  * pool
  * soccer
  * planete
* light effect
  * police: from pacmaze
  * raining: with particles
  * strombo
* post effect
  * chroma shift
  * motion blur
  * film

* how to make the table move ?
  * make the physics of the table to follow the 3d
  * ERROR the table doesnt move, the up vector is


* Keep score between map
  * as the page is reloaded... how to do that ?
  * cookie ? sessionStorage ?
  * who write in it ? who remove ?


## notes
* research on marble
  * http://johnstejskal.com/blog/creating-a-marble-game-with-unity3d-part-1-research-and-concept/
* hamster ball http://www.youtube.com/watch?v=H9FkUQhKU70

* video marble arena
  * game i tried to copied at the begining
  * http://www.youtube.com/watch?v=BifLFPiV41E marble arena 1 soccer version
  * http://www.youtube.com/watch?v=CL9f33ZQ4C0 marble arena 1 arena verion
* monkey ball
  * fun marble game
  * only a table moving
  * http://www.youtube.com/watch?v=X7ynOZf1KaQ
* juice video
  * http://www.youtube.com/watch?v=Fy0aCDmgnxg
* other marble game
  * marble madness http://www.youtube.com/watch?v=vMYibbzJlVs
* chrome marble
  * demo chrome to play a marble game
  * http://www.youtube.com/watch?v=Fy0aCDmgnxg

## States in sessionStorage
* score
  * reset on homepage
  * read it 
* level
  * in url ? via hash
* force to go thru homepage

## ChangeLogs

v2.0
* switch it all to threex
* much better looking
* fixed bug in camera handling

v1.1
* added menu based on bootstrap + share button
* ported to tquery r57.0
* added timer to measure your score
* granular sound for rolling ball

v1.0
* initial release
