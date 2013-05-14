var THREEx = THREEx || {}

THREEx.CannonWorld	= function(){
	// physics world init
	var origin	= new CANNON.World()
	this.origin	= origin
	
	origin.broadphase	= new CANNON.NaiveBroadphase()
	origin.gravity.set(0,-9.81,0)
	origin.solver.iterations = 10

	var timerId	= null;
	/**
	 * start periodically updating - it must not be done on animation frame
	 * @param  {Number} period the period to use for update. default to 1/60seconds
	 */
	this.start	= function(period){
		period	= period !== undefined ? period : 1/60;
		timerId	= setInterval(function(){
			origin.step(period);		
		}, period*1000)		
		return this;
	}.bind(this)
	/**
	 * stop updating
	 */
	this.stop	= function(){
		clearInterval(timerId)
		timerId	= null;
	}
}
