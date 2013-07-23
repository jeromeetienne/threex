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


* TODO make a load/save for the renderingProfile
  * used for custom renderingProfile
* handle profile
  * renderingProfile.js
  * renderingProfile.skymapEnabled
  * renderingProfile.shadowMapEnabled
  * renderingProfile.soundFxEnabled
  * renderingProfile.soundTrackEnabled

* DONE when all balls are killed, you win the game and go to next level
* TODO put a cage all around if any body touch it, kill it
* have a game won sequence
  * easy but require to win a game
  * currently not possible

* Keep score between map
  * as the page is reloaded... how to do that ?
  * cookie ? sessionStorage ?
  * who write in it ? who remove ?

* DONE keep mute status
  * handle a setting saved in LocalStorage
* have multiple levels
  * how to do multiple model
  * a pool table. you got all the balls already. respect the topology

* have a shark ball, you got the texture, get the music, something 
  scary, louder and louder as it is coming close to you
  * put the listener in the ball ?
  * 'les dents de la mer' something like that

* ball intensity concept
  * it is a pure visual, updated by a level
  * so .update() function, .intensity(value)
  * how to make the first instance ? the visual of the intensity
  * marble arena put 'rings of stars'
  * it may be a number in a canvas... simple and the code is already there
* put it in its own repo. usefull to publish the site

* DONE when you kill a ball, it doesnt come back
  * how to remove it temporarily ?
    * up to when ?
    * need to reset it later
  * NOTE: so dont remove it, let them hover on the map

* DONE if a ball is hit, it is loaded a bit more
  * visualize the load by stars particles
  * the score when destroyed of the load
* DONE ball are attracked by you a bit
* DONE put a game lost sequence
* DONE botgoal texture, black and white chessboard
* idea levels
  * DONE pools ball - bring them back from tQuery

## notes
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
