// This THREEx helps you preload your data. Texture/sound/images, etc...
// 
// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// # Constructor
THREEx.Preloader	= function()
{
	this._flow	= new THREEx.Preloader.Flow();
	this._cache	= new THREEx.Preloader.MicroCache();
}

// # Destructor
THREEx.Preloader.prototype.destroy	= function()
{
	this._flow.destroy();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Preloader.prototype.start	= function()
{
	this._flow.seq(function(next){
		this.trigger('complete')
	}.bind(this));
}


/**
 * Getter for the cache
*/
THREEx.Preloader.prototype.cache	= function(){ return this._cache;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Load a texture
 * @param {String} the url of the texture 
 * @param {String} cacheName the name of the asset in the cache. if false, then dont store in cache
 * @returns {THREE.Preloader} return the object itself for chained api
*/
THREEx.Preloader.prototype.texture	= function(url, assetName, mapping)
{
	this._flow.par(function(next){
		// if it is already in the cache, do nothing
		if( assetName && this._cache.contains(assetName) ){
			next();
		}else{
			// if not in cache, put it immediatly and start loading
			var texture	= THREE.ImageUtils.loadTexture(url, mapping, function(){
				next();
			});
			if( assetName )	this._cache.set(assetName, texture);
		}
	}.bind(this));
	return this;
}

/**
 * Load a texture
 * @param {String} the url of the texture 
 * @param {String} cacheName the name of the asset in the cache. if false, then dont store in cache
 * @returns {THREE.Preloader} return the object itself for chained api
*/
THREEx.Preloader.prototype.textureCube	= function(urls, assetName, mapping)
{
	this._flow.par(function(next){
		// if it is already in the cache, do nothing
		if( assetName && this._cache.contains(assetName) ){
			next();
		}else{
			// if not in cache, put it immediatly and start loading
			var texture	= THREE.ImageUtils.loadTextureCube(urls, mapping, function(){
				next();
			});
			if( assetName )	this._cache.set(assetName, texture);
		}
	}.bind(this));
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//		put some helpers						//
//////////////////////////////////////////////////////////////////////////////////
/**
 * Flow control - from https://github.com/jeromeetienne/gowiththeflow.js
*/
THREEx.Preloader.Flow	= function(){
	var self, stack = [], timerId = setTimeout(function(){ timerId = null; self._next(); }, 0);
	return self = {
		destroy	: function(){ timerId && clearTimeout(timerId);	},
		par	: function(callback, isSeq){
			if(isSeq || !(stack[stack.length-1] instanceof Array)) stack.push([]);
			stack[stack.length-1].push(callback);
			return self;
		},seq	: function(callback){ return self.par(callback, true);	},
		_next	: function(err, result){
			var errors = [], results = [], callbacks = stack.shift() || [], nbReturn = callbacks.length, isSeq = nbReturn == 1;
			callbacks && callbacks.forEach(function(fct, index){
				fct(function(error, result){
					errors[index]	= error;
					results[index]	= result;		
					if(--nbReturn == 0)	self._next(isSeq?errors[0]:errors, isSeq?results[0]:results)
				}, err, result)
			})
		}
	}
};


/**
 * from https://github.com/jeromeetienne/MicroCache.js
*/
THREEx.Preloader.MicroCache	= function(){
	var _values	= {};
	return {
		get	: function(key){ return _values[key];	},
		contains: function(key){ return key in _values;	},
		remove	: function(key){ delete _values[key];	},
		set	: function(key, value){	_values[key] = value;},
		values	: function(){ return _values;	},
		reset	: function(){ _value = {};	},
		getSet	: function(key, value){
			if( !this.contains(key) ){
				this.set(key, typeof value == 'function' ? value() : value )
			}
			return this.get(key);
		}
	}
};

/**
 * microevents.js - https://github.com/jeromeetienne/microevent.js
*/
(function(destObj){
	destObj._events	= {};
	destObj.bind	= function(event, fct){
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	};
	destObj.unbind	= function(event, fct){
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	destObj.trigger	= function(event /* , args... */){
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
})(THREEx.Preloader.prototype);