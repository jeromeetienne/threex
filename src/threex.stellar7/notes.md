* how to code it
* how to do the security ?
  * how a bot can't know more than he should
  * likely a barrier webworker

* in battlefield4, the mission "south china - get back to the valkyrie" is a LOT like a tank.
  * im thinking about copying this for stellar7 clone :)
  * video http://www.youtube.com/watch?v=ZmLtTWx6srk#t=437

What about code orga
====================
* THREEx.Stellar7.TankModel
* THREEx.Stellar7.TankControls
  * may be human controlled - THREEx.Stellar7.KeyboardTankControls
  * may be bots controlled - fightcode like
* THREEx.Stellar7.TankCameraControls
* THREEx.Stellar7.TankVehicule
  * include Model, Controls, life
  * onTankCollision
  * onWallCollision
  * onScannedRobot
  * onHitByBullet
* THREEx.Stellar7.Shoot
  * contains the model and the controls
  * THREEx.Stellar7.Shoot.fromTank
* THREEx.Stellar7.Game
  * all the players
  * all the shoots
  * loop: update all players, all shoots, handle events
* bots handled by fightcode 
