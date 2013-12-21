* how to code it
* how to do the security ?
  * how a bot can't know more than he should
  * likely a barrier webworker


What about code orga
====================
* THREEx.Stellar7.TankModel
* THREEx.Stellar7.TankControls
* THREEx.Stellar7.TankPlayer
  * include Model, Controls, life, 
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
* human controlled bot 