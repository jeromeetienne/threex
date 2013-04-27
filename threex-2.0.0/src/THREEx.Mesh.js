/** @namespace */
var THREEx	= THREEx || {};

THREEx.Mesh	= function(){
	// call parent constructor
	THREE.Mesh.apply( this, arguments );
}

THREEx.Mesh.prototype = Object.create( THREE.Mesh.prototype )

typeof(mixinCreatorPattern) === 'undefined' || mixinCreatorPattern(THREEx.Mesh, 'THREEx_Mesh')

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

// TODO this should be at the THREEx.Object3D level
// yeah but then no THREE.Object3D will benefit from it

THREEx.Mesh.prototype.addTo = function(object3D) {
	// handle arguments polymorphism
	if( arguments.length === 1 && (THREEx.Context && object3D instanceof THREEx.Context) ){
		object3D	= object3D.scene;
	}
	// add the object
	object3D.add(this)
	// for chained api
	return this;
}

THREEx.Mesh.prototype.removeFrom = function(object3D) {
	object3D.remove(this)
	return this;
}

THREEx.Mesh.prototype.detach = function() {
	var object3D	= this;
	if( object3D.parent === undefined )	return;
	object3D.parent.remove( object3D );
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREE.Object3D.prototype.addTo = (function(){
	// check this instance method isnt already defined
	console.assert( THREE.Object3D.prototype.addTo === undefined, 'method already defined' )
	// return the instance method
	return function(object3D) {
		// handle arguments polymorphism
		if( arguments.length === 1 && (THREEx.Context && object3D instanceof THREEx.Context) ){
			object3D	= object3D.scene;
		}
		// add the object
		object3D.add(this)
		// for chained api
		return this;
	}
})();

THREE.Object3D.prototype.removeFrom = (function(){
	// check this instance method isnt already defined
	console.assert( THREE.Object3D.prototype.removeFrom === undefined, 'method already defined' )
	// return the instance method
	return function(object3D) {
		object3D.remove(this)
		return this;
	}
})();

THREE.Object3D.prototype.detach = (function(){
	// check this instance method isnt already defined
	console.assert( THREE.Object3D.prototype.detach === undefined, 'method already defined' )
	// return the instance method
	return function() {
		var object3D	= this;
		if( object3D.parent === undefined )	return;
		object3D.parent.remove( object3D );
		return this;
	}
})();

