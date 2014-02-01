var THREEx	= THREEx || {};

THREEx.LeapController	= function(){
	// init controller
	this._controller= new Leap.Controller({
		enableGestures	: true
	});
	// store last frame and notify all listener
	this._lastFrame	= null
	this._controller.loop(function(frame){
		this._lastFrame	= frame
		this.dispatchEvent('frame', frame)
	}.bind(this));

	//////////////////////////////////////////////////////////////////////////////////
	//		gesture tracking						//
	//////////////////////////////////////////////////////////////////////////////////		
	var gesturesData= {};	
	this.addEventListener('frame', function(frame) {
		if( frame.valid !== true )	return;
		frame.gestures && frame.gestures.forEach(function(gesture){
			// get the eventEmitter for this gesture
			var gestureData	= gesturesData[gesture.id]
			// create eventEmitter if needed
			if( gestureData === undefined ){
				//console.log('create eventEmitter for', gesture.id)
				gesturesData[gesture.id] = {
					userData: {},
					emitter	: THREEx.LeapController.MicroeventMixin({})
				};
				var gestureData	= gesturesData[gesture.id]
				this.dispatchEvent('gestureTracking', gesture, gestureData)
			}
			// handle it by state
			if( gesture.state === 'start' ){
			}else if( gesture.state === 'update' ){
				gestureData.emitter.dispatchEvent('update', gesture, gestureData)
			}else if( gesture.state === 'stop' ){
				gestureData.emitter.dispatchEvent('stop', gesture, gestureData)
				// delete eventEmitter
				delete gesturesData[gesture.id]
				//console.log('delete eventEmitter for', gesture.id)
			}
		}.bind(this));
	}.bind(this));

	//////////////////////////////////////////////////////////////////////////////////
	//		handle pointable Tracking					//
	//////////////////////////////////////////////////////////////////////////////////		
	var pointablesData	= {};	
	this.addEventListener('frame', function(frame) {
		if( frame.valid !== true )	return;
		if( !frame.pointables )		return;
		// remove pointable which are no more present
		Object.keys(pointablesData).forEach(function(pointableId){
			// get the eventEmitter for this gesture
			var pointableData	= pointablesData[pointableId]
			// if this pointableId is not more present, notify stop and delete it
			var inFrame	= pointableId in frame.pointablesMap;
			if( inFrame === false ){
				pointableData.emitter.dispatchEvent('stop', pointableId, pointableData)
				delete pointablesData[pointableId]
			}
		});	
		// go thru all pointables present in this frame
		frame.pointables.forEach(function(pointable){
			var pointableId	= String(pointable.id)
			// get the eventEmitter for this gesture
			var pointableData	= pointablesData[pointableId]
			// create eventEmitter if needed
			var justCreated	= false;
			if( pointableData === undefined ){
				//console.log('create eventEmitter for', gesture.id)
				pointablesData[pointableId] = {
					userData: {},
					emitter	: THREEx.LeapController.MicroeventMixin({})
				};
				var pointableData	= pointablesData[pointableId]
				justCreated	= true;
			}
			// handle it by state
			if( justCreated ){
				this.dispatchEvent('pointableTracking', pointable, pointableData)
				//console.log('pointable creating', pointableId)
			}else{
				pointableData.emitter.dispatchEvent('update', pointable, pointableData)				
				//console.log('pointable updating', pointableId)
			}
		}.bind(this));
	}.bind(this));


	//////////////////////////////////////////////////////////////////////////////////
	//		handle Hand Tracking					//
	//////////////////////////////////////////////////////////////////////////////////		
	var handsData	= {};	
	this.addEventListener('frame', function(frame) {
		if( frame.valid !== true )	return;
		if( !frame.hands )		return;
		// remove hand which are no more present
		Object.keys(handsData).forEach(function(handId){
			// get the eventEmitter for this gesture
			var handData	= handsData[handId]
			// if this handId is not more present, notify stop and delete it
			var inFrame	= handId in frame.handsMap;
			if( inFrame === false ){
				handData.emitter.dispatchEvent('stop', handId, handData)
				delete handsData[handId]
			}
		});	
		// go thru all hands present in this frame
		frame.hands.forEach(function(hand){
			var handId	= String(hand.id)
			// get the eventEmitter for this gesture
			var handData	= handsData[handId]
			// create eventEmitter if needed
			var justCreated	= false;
			if( handData === undefined ){
				//console.log('create eventEmitter for', gesture.id)
				handsData[handId] = {
					userData: {},
					emitter	: THREEx.LeapController.MicroeventMixin({})
				};
				var handData	= handsData[handId]
				justCreated	= true;
			}
			// handle it by state
			if( justCreated ){
				this.dispatchEvent('handTracking', hand, handData)
				//console.log('hand creating', handId)
			}else{
				handData.emitter.dispatchEvent('update', hand, handData)				
				//console.log('pointable updating', pointableId)
			}
		}.bind(this));
	}.bind(this));
}

//////////////////////////////////////////////////////////////////////////////////
//		microevent.js							//
//////////////////////////////////////////////////////////////////////////////////


THREEx.LeapController.MicroeventMixin	= function(destObject){
	destObject.addEventListener	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		return fct;
	};
	destObject.removeEventListener	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	destObject.dispatchEvent	= function(event /* , args... */){
		if(this._events === undefined) 	this._events	= {};
		if( this._events[event] === undefined )	return;
		var tmpArray	= this._events[event].slice(); 
		for(var i = 0; i < tmpArray.length; i++){
			var result	= tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
			if( result !== undefined )	return result;
		}
		return undefined;
	};
	return destObject;
}

// make it eventable - With microevent.js
THREEx.LeapController.MicroeventMixin(THREEx.LeapController.prototype);


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.LeapController.prototype.controller	= function(){
	return this._controller;
}

THREEx.LeapController.prototype.lastFrame = function() {
	return this._lastFrame;
};

THREEx.LeapController.prototype.toVector3 = function(original) {
	var vector3	= new THREE.Vector3()
	if( original instanceof THREE.Vector3 ){
		vector3.copy(original)
	}else if( original instanceof Array && original.length === 3 ){
		vector3.set(original[0], original[1], original[2])
	}else	console.assert(false)
	return vector3;
}

THREEx.LeapController.prototype.convertPosition = function(original) {
	var vector3	= this.toVector3(original);
	vector3.x	= this.convertDistance(vector3.x -   0)	
	vector3.y	= this.convertDistance(vector3.y - 250)
	vector3.z	= this.convertDistance(vector3.z -   0)	
	return vector3;
};

THREEx.LeapController.prototype.convertDistance = function(value){
	return value / 50;
}