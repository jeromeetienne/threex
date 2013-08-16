var THREEx = THREEx || {}

THREEx.CannonWorld	= function(){
	// physics world init
	var world	= new CANNON.World()
        world.gravity.set(0,-9.81,0);
        world.broadphase = new CANNON.NaiveBroadphase();
	
	// var solver = new CANNON.GSSolver();
	// // world.defaultContactMaterial.contactEquationStiffness = 1e9;
	// // world.defaultContactMaterial.contactEquationRegularizationTime = 10;
	// solver.iterations	= 30;
	// solver.tolerance	= 0.01;
	// world.solver		= new CANNON.SplitSolver(solver);


	// world.solver.iterations = 30

	this.world	= world
	// @TODO to remove
	Object.defineProperty(this, 'origin', {
		get	: function(){
			console.warn('THREEx.cannonWorld depreciate .origin, use .world instead')
			return world
		}
	})

	           
	var timerId	= null;


	/**
	 * contains bodies to remove post world.step() - needed as it is impossible
	 * to remove body during .step() - so inside a 'collide' notification
	 * @type {Array[]}
	 */
	this.bodiesToRemove	= []

	/**
	 * start periodically updating - it must not be done on animation frame
	 * @param  {Number} period the period to use for update. default to 1/60seconds
	 */
	this.start	= function(period){
		if( this.isRunning() === true )	return
		period	= period !== undefined ? period : 1/60;
		timerId	= setInterval(function(){
			world.step(period);
			// honor this.bodiesToRemove
			this.bodiesToRemove.forEach(function(body){
				world.remove(body)
			})
			this.bodiesToRemove	= []
		}.bind(this), period*1000)
		return this;
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
