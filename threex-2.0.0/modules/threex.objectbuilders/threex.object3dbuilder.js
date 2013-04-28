/** @namespace */
var THREEx	= THREEx || {};

THREEx.Object3DBuilder	= function(object3D){
	console.assert(object3D instanceof THREE.Object3D)
	this.content	= object3D;
	this.object3D	= object3D;
}

THREEx.createObject3D	= function(object3D){
	return new THREEx.Object3DBuilder(object3D)
}

/**
 * Support for .back() concept for chained api
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
THREEx.Object3DBuilder.prototype.back = function(value) {
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;	// for chained api
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Object3DBuilder.prototype.addTo = function(object3D) {
	object3D.add(this.object3D)
	return this;
};

THREEx.Object3DBuilder.prototype.removeFrom = function(object3D) {
	object3D.remove(this.object3D)
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Object3DBuilder.prototype.position = function(vector3){
	// handle arguments polymorphism
	if( arguments.length === 1 && arguments[0] instanceof THREE.Object3D ){
		vector3	= arguments[0].position
	}else{
		vector3	= THREEx.ConvertArguments.toVector3(arguments)
	}
	// set position
	this.object3D.position	= vector3
	// for chained api
	return this;
}

THREEx.Object3DBuilder.prototype.translate = function(vector3){
	// handle arguments polymorphism
	vector3	= THREEx.ConvertArguments.toVector3(arguments)
	// set position
	this.object3D.position.add( vector3 )
	// for chained api
	return this;
}

THREEx.Object3DBuilder.prototype.positionX = function(scalar){
	this.object3D.position.x	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.positionY = function(scalar){
	this.object3D.position.y	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.positionZ = function(scalar){
	this.object3D.position.z	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.translateX = function(scalar){
	this.object3D.position.x	+= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.translateY = function(scalar){
	this.object3D.position.y	+= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.translateZ = function(scalar){
	this.object3D.position.z	+= scalar
	return this;	// for chained api
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Object3DBuilder.prototype.rotation = function(vector3){
	// handle arguments polymorphism
	if( arguments.length === 1 && arguments[0] instanceof THREE.Object3D ){
		vector3	= arguments[0].rotation
	}else{
		vector3	= THREEx.ConvertArguments.toVector3(arguments)
	}
	// set scale
	this.object3D.rotation	= vector3
	// for chained api
	return this;
}


THREEx.Object3DBuilder.prototype.rotate = function(vector3){
	// handle arguments polymorphism
	vector3	= THREEx.ConvertArguments.toVector3(arguments)
	// set position
	this.object3D.rotation.add( vector3 )
	// for chained api
	return this;
}

THREEx.Object3DBuilder.prototype.rotationX = function(scalar){
	this.object3D.rotation.x	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.rotationY = function(scalar){
	this.object3D.rotation.y	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.rotationZ = function(scalar){
	this.object3D.rotation.z	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.rotateX = function(scalar){
	this.object3D.rotation.x	+= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.rotateY = function(scalar){
	this.object3D.rotation.y	+= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.rotateZ = function(scalar){
	this.object3D.rotation.z	+= scalar
	return this;	// for chained api
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Object3DBuilder.prototype.scale = function(vector3){
	// handle arguments polymorphism
	if( arguments.length === 1 && typeof(arguments[0]) === 'number' ){
		vector3	= new THREE.Vector3(arguments[0], arguments[0], arguments[0])
	}else if( arguments.length === 1 && arguments[0] instanceof THREE.Object3D ){
		vector3	= arguments[0].scale
	}else{
		vector3	= THREEx.ConvertArguments.toVector3(arguments)
	}
	// do the operation
	this.object3D.scale	= vector3
	// return this for chained API
	return this;
}

THREEx.Object3DBuilder.prototype.scaleBy = function(vector3){
	var object3D	= this.object3D;
	// handle arguments polymorphism
	if( arguments.length === 1 && typeof(arguments[0]) === 'number' ){
		vector3	= new THREE.Vector3(arguments[0], arguments[0], arguments[0])
	}else{
		vector3	= THREEx.ConvertArguments.toVector3(arguments)
	}
	// do the operation
	this.object3D.scale.multiply(vector3);
	// return this for chained API
	return this;
}

THREEx.Object3DBuilder.prototype.scaleX = function(scalar){
	this.object3D.scale.x	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.scaleY = function(scalar){
	this.object3D.scale.y	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.scaleZ = function(scalar){
	this.object3D.scale.z	= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.scaleByX = function(scalar){
	this.object3D.scale.x	*= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.scaleByY = function(scalar){
	this.object3D.scale.y	*= scalar
	return this;	// for chained api
}

THREEx.Object3DBuilder.prototype.scaleByZ = function(scalar){
	this.object3D.scale.z	*= scalar
	return this;	// for chained api
}

