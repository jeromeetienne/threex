var THREEx = THREEx || {}

THREEx.CannonWorld	= function(){
	// physics world init
	var world	= new CANNON.World()
	this.origin	= world
	
        var solver = new CANNON.GSSolver();

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRegularizationTime = 10;

	solver.iterations	= 30;
	solver.tolerance	= 0.01;
	world.solver		= new CANNON.SplitSolver(solver);

        world.gravity.set(0,-9.81,0);
        world.broadphase = new CANNON.NaiveBroadphase();
           
	var timerId	= null;
	/**
	 * start periodically updating - it must not be done on animation frame
	 * @param  {Number} period the period to use for update. default to 1/60seconds
	 */
	this.start	= function(period){
		if( this.isRunning() === true )	return
		period	= period !== undefined ? period : 1/60;
		timerId	= setInterval(function(){
			world.step(period);		
		}, period*1000)		
	}.bind(this)
	/**
	 * stop updating
	 */
	this.stop	= function(){
		if( this.isRunning() === false )	return
		clearInterval(timerId)
		timerId	= null;
	}
	/**
	 * test if world is running or not
	 * @return {booleant} true if the world is running, false otherwise
	 */
	this.isRunning	= function(){
		return timerId !== null ? true : false
	}
}
