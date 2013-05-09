/** @namespace */
var THREEx	= THREEx || {};

THREEx.GeometryBuilder	= function(geometry){
	console.assert(geometry instanceof THREE.Geometry)
	this.geometry	= geometry
}

/**
 * Support for .back() concept for chained api
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
THREEx.GeometryBuilder.prototype.back = function(value) {
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;	// for chained api
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.GeometryBuilder.prototype.translate	= function(vector3){
	// handle arguments polymorphism
	vector3	= THREEx.ConvertArguments.toVector3(arguments)

	var matrix	= new THREE.Matrix4()
	matrix.makeTranslation(vector3.x, vector3.y, vector3.z)
	this.geometry.applyMatrix(matrix)
	this.geometry.verticesNeedUpdate = true
	return this;
}

THREEx.GeometryBuilder.prototype.translateX	= function(scalar){
	return this.translate(scalar, 0, 0)
}

THREEx.GeometryBuilder.prototype.translateY	= function(scalar){
	return this.translate(0, scalar, 0)
}

THREEx.GeometryBuilder.prototype.translateZ	= function(scalar){
	return this.translate(0, 0, scalar)
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.GeometryBuilder.prototype.scaleBy = function(vector3) {
	// handle arguments polymorphism
	vector3	= THREEx.ConvertArguments.toVector3(arguments)

	var matrix	= new THREE.Matrix4()
	matrix.makeScale(vector3.x, vector3.y, vector3.z)
	this.geometry.applyMatrix(matrix)
	this.geometry.verticesNeedUpdate = true
	return this;
};

THREEx.GeometryBuilder.prototype.scaleXBy	= function(scalar){
	return this.scaleBy(scalar, 1, 1)
}

THREEx.GeometryBuilder.prototype.scaleYBy	= function(scalar){
	return this.scaleBy(1, scale, 1)
}

THREEx.GeometryBuilder.prototype.scaleZBy	= function(scalar){
	return this.scaleBy(1, 1, scale)
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.GeometryBuilder.prototype.rotateX	= function(scalar){
	var matrix	= new THREE.Matrix4()
	matrix.makeRotationX(scalar)
	this.geometry.applyMatrix(matrix)
	this.geometry.verticesNeedUpdate = true
	return this;
}

THREEx.GeometryBuilder.prototype.rotateY	= function(scalar){
	var matrix	= new THREE.Matrix4()
	matrix.makeRotationY(scalar)
	this.geometry.applyMatrix(matrix)
	this.geometry.verticesNeedUpdate = true
	return this;
}

THREEx.GeometryBuilder.prototype.rotateZ	= function(scalar){
	var matrix	= new THREE.Matrix4()
	matrix.makeRotationZ(scalar)
	this.geometry.applyMatrix(matrix)
	this.geometry.verticesNeedUpdate = true
	return this;
}

