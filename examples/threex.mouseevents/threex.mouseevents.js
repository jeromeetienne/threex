// This THREEx helper makes it easy to handle the mouse events in your 3D scene

// 
// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};

THREEx.MouseEvents	= function(domElement)
{
	this._domElement= domElement || document;
	this._projector	= new THREE.Projector();
	
	this._selected	= null;

	var _this	= this;
	this._$onClick		= function(){ _this._onClick.apply(_this, arguments);		};
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments);	};
	this._domElement.addEventListener( 'click'	, this._$onClick	, false );
	this._domElement.addEventListener( 'mousemove'	, this._$onMouseMove	, false );
}

THREEx.MouseEvents.prototype.destroy	= function()
{
	this._domElement.removeEventListener( 'click', this._$onClick, false );
	this._domElement.removeEventListener( 'mousemove', this._$onMouseMove, false );
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.MouseEvents.prototype._objectCtxInit	= function(object3d){
	object3d._3xMouseEvent = {
		isOver	: false
	};
}
THREEx.MouseEvents.prototype._objectCtxDeinit	= function(object3d){
	delete object3d._3xMouseEvent;
}
THREEx.MouseEvents.prototype._objectCtxIsInit	= function(object3d){
	return object3d._3xMouseEvent ? true : false;
}
THREEx.MouseEvents.prototype._objectCtxGet	= function(object3d){
	return object3d._3xMouseEvent;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.MouseEvents.prototype.bind	= function(object3d, eventName, callback)
{
	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);
	var objectCtx	= this._objectCtxGet(object3d);
	
	if( eventName === 'click' ){
		if( !objectCtx.clickHandlers )	objectCtx.clickHandlers	= [];
		objectCtx.clickHandlers.push({
			callback	: callback
		});
	}else if( eventName === 'mouseenter' ){
		if( !objectCtx.enterHandlers )	objectCtx.enterHandlers	= [];
		objectCtx.enterHandlers.push({
			callback	: callback
		});
	}else if( eventName === 'mouseleave' ){
		if( !objectCtx.leaveHandlers )	objectCtx.leaveHandlers	= [];
		objectCtx.leaveHandlers.push({
			callback	: callback
		});
	}else	console.assert(false);
}

THREEx.MouseEvents.prototype._bound	= function(eventName, object3d){
	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx )	return false;
	if( eventName === 'click' ){
		return objectCtx.clickHandlers ? true : false;
	}else if( eventName === 'mouseenter' ){
		return objectCtx.enterHandlers ? true : false;
	}else if( eventName === 'mouseleave' ){
		return objectCtx.leaveHandlers ? true : false;
	}else 	console.assert(false);
	return undefined;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.MouseEvents.prototype._onMouseMove	= function(event)
{
	var mouseX	= +(event.clientX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(event.clientY / window.innerHeight) * 2 + 1;

	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	this._projector.unprojectVector( vector, camera );

	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var intersects = ray.intersectScene( scene );
	
	var oldSelected	= this._selected;
	
	if( intersects.length > 0 ){
		var intersect	= intersects[ 0 ];
		var newSelected	= intersect.object;
		this._selected	= newSelected;
	
		var enterHandlers, leaveHandlers;
		if( oldSelected != newSelected ){
			// if newSelected bound mouseenter, notify it
			if( this._bound('mouseenter', newSelected) ){
				enterHandlers	= this._objectCtxGet(newSelected).enterHandlers.slice(0); 
			}
			// if there is a oldSelect and oldSelected bound mouseleave, notify it
			if( oldSelected && this._bound('mouseleave', oldSelected) ){
				leaveHandlers	= this._objectCtxGet(oldSelected).leaveHandlers.slice(0); 
			}
		}
	}else{
		// if there is a oldSelect and oldSelected bound mouseleave, notify it
		if( oldSelected && this._bound('mouseleave', oldSelected) ){
			leaveHandlers	= this._objectCtxGet(oldSelected).leaveHandlers.slice(0); 
		}

		this._selected	= null;
	}

	// notify mouseEnter - done at the end with a copy of the list to allow callback to remove handlers
	enterHandlers && enterHandlers.forEach(function(handler){
		handler.callback(newSelected);
	})
	// notify mouseLeave - done at the end with a copy of the list to allow callback to remove handlers
	leaveHandlers && leaveHandlers.forEach(function(handler){
		handler.callback(oldSelected);
	})
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.MouseEvents.prototype._onClick	= function(event)
{
	var mouseX	= +(event.clientX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(event.clientY / window.innerHeight) * 2 + 1;

	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	this._projector.unprojectVector( vector, camera );

	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var intersects = ray.intersectScene( scene );

	// FIXME to test only the bound objects is likely faster to run
	// - handle the list
	// var intersects = ray.intersectObjects( [mesh] );

	for(var i = 0; i < intersects.length; i++){
		var intersect	= intersects[i];
		var object3d	= intersect.object;
		var objectCtx	= this._objectCtxGet(object3d);

		if( !objectCtx )	continue;
console.log(objectCtx)
		objectCtx.clickHandlers.slice(0).forEach(function(handler){
			handler.callback(object3d, intersect);
		})
	}
}

