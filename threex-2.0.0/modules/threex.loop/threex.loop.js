var THREEx	= THREEx || {};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle the rendering loop
 *
 * @class This class handle the rendering loop
 *
 * @param {THREE.World} world the world to display (optional)
*/
THREEx.Loop	= function(){	
	// internally if world present do that
	this._hooks	= [];
	this._lastTime	= null;
};

/**
 * destructor
*/
THREEx.Loop.prototype.destroy	= function(){
	this.stop();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


/**
 * start looping
 * 
 * @returns {THREEx.Loop} chained API
*/
THREEx.Loop.prototype.start	= function(){
	if( this._timerId )	this.stop();
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );
	// for chained API
	return this;
}

/**
 * stop looping
 * 
 * @returns {THREEx.Loop} chained API
*/
THREEx.Loop.prototype.stop	= function(){
	cancelAnimationFrame(this._timerId);
	this._timerId	= null;
	// for chained API
	return this;
}

THREEx.Loop.prototype.isRunning = function() {
	return this._timerId ? true : false;
};

THREEx.Loop.prototype.pauseToggle= function() {
	if( this.isRunning() )	this.stop()
	else			this.start();
	return this;
};

/**
 * max delta notified by loop callback
 * @type {Number}
 */
THREEx.Loop.maxDelta	= 1/5;

THREEx.Loop.prototype._onAnimationFrame	= function()
{
	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );

	// tick once
	this.tick();
}

THREEx.Loop.prototype.tick	= function(){
	// update time values
	var now		= THREEx.nowSeconds();
	// init _lastTime if needed
	if( !this._lastTime )	this._lastTime = now - 1/60;
	// sanity check - honor THREEx.Loop.maxDelta
	var minLastTime	= now - THREEx.Loop.maxDelta;
	if( this._lastTime < minLastTime ){
		this._lastTime	= minLastTime;
		console.warn('last loop update is older than max', THREEx.Loop.maxDelta.toFixed(3), 'seconds! throttling it to max value.')		
	}
	// compute delta
	var delta	= now - this._lastTime;
	// update _lastTime
	this._lastTime	= now;

	// run all the hooks - from lower priority to higher - in order of registration
	for(var priority = 0; priority <= this._hooks.length; priority++){
		if( this._hooks[priority] === undefined )	continue;
		var callbacks	= this._hooks[priority].slice(0)
		for(var i = 0; i < callbacks.length; i++){
			callbacks[i](delta, now);
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		Handle the hooks						//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Loop.prototype.PRE_RENDER	= 20;
THREEx.Loop.prototype.ON_RENDER		= 50;
THREEx.Loop.prototype.POST_RENDER	= 80;

/**
 * hook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {Function} the callback function. usefull for this._$callback = loop.hook(this._callback.bind(this))
 *                     and later loop.unhook(this._$callback)
*/
THREEx.Loop.prototype.hook	= function(priority, callback)
{
	// handle parameters
	if( typeof priority === 'function' ){
		callback	= priority;
		priority	= this.PRE_RENDER;
	}

	this._hooks[priority]	= this._hooks[priority] || [];
	console.assert(this._hooks[priority].indexOf(callback) === -1)
	this._hooks[priority].push(callback);
	return callback;
}

/**
 * unhook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {THREEx.Loop} chained API
*/
THREEx.Loop.prototype.unhook	= function(priority, callback)
{
	// handle arguments polymorphism
	if( typeof priority === 'function' ){
		callback	= priority;
		priority	= this.PRE_RENDER;
	}

	var index	= this._hooks[priority].indexOf(callback);
	console.assert(index !== -1);
	this._hooks[priority].splice(index, 1);
	this._hooks[priority].length === 0 && delete this._hooks[priority]
	// for chained API
	return this;
}


// bunch of shortcut
// - TODO should it be in a plugin ?

THREEx.Loop.prototype.hookPreRender	= function(callback){ return this.hook(this.PRE_RENDER, callback);	};
THREEx.Loop.prototype.hookOnRender	= function(callback){ return this.hook(this.ON_RENDER, callback);	};
THREEx.Loop.prototype.hookPostRender	= function(callback){ return this.hook(this.POST_RENDER, callback);	};
THREEx.Loop.prototype.unhookPreRender	= function(callback){ return this.unhook(this.PRE_RENDER, callback);	};
THREEx.Loop.prototype.unhookOnRender	= function(callback){ return this.unhook(this.ON_RENDER, callback);	};
THREEx.Loop.prototype.unhookPostRender	= function(callback){ return this.unhook(this.POST_RENDER, callback);	};


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * precise version of Date.now() -
 * It provide submillisecond precision based on window.performance.now() when 
 * available, fall back on Date.now()
 * see http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision 
*/
THREEx.now	= (function(){
	var p			= window.performance	|| {};
	if( p.now )		return function(){ return p.timing.navigationStart + p.now();		};
	else if( p.mozNow )	return function(){ return p.timing.navigationStart + p.mozNow();	};
	else if( p.webkitNow )	return function(){ return p.timing.navigationStart + p.webkitNow()	};
	else if( p.mskitNow )	return function(){ return p.timing.navigationStart + p.msNow()		};
	else if( p.okitNow )	return function(){ return p.timing.navigationStart + p.oNow()		};
	else			return function(){ return Date.now;					};	
})();


/**
 * same as THREEx.now() but in seconds. later a migration will make .now->.nowMilliseconds
 * and .nowSeconds()
 * @return {Number} THREEx.now() in seconds
 */
THREEx.nowSeconds	= function(){
	return THREEx.now() / 1000;
}