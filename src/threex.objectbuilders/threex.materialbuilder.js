/** @namespace */
var THREEx	= THREEx || {};

THREEx.MaterialBuilder	= function(material){
	console.assert(material instanceof THREE.Material)
	this.material	= material
}

/**
 * Support for .back() concept for chained api
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
THREEx.MaterialBuilder.prototype.back = function(value){
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;	// for chained api
}

//////////////////////////////////////////////////////////////////////////////////
//		inject attributes						//
//////////////////////////////////////////////////////////////////////////////////

;(function(){
	function injectAttr(attrName, convertFn){
		THREEx.MaterialBuilder.prototype[attrName] = function(){
			this.material[attrName]	= convertFn(arguments)
			return this;
		}
	}
	// insert each attribute
	injectAttr('transparent', THREEx.ConvertArguments.toNumber)
	injectAttr('opacity'	, THREEx.ConvertArguments.toBoolean)

	injectAttr('side'	, THREEx.ConvertArguments.toNumber)

	injectAttr('depthTest'	, THREEx.ConvertArguments.toBoolean)
	injectAttr('depthWrite'	, THREEx.ConvertArguments.toBoolean)

	injectAttr('visible'	, THREEx.ConvertArguments.toBoolean)
	injectAttr('overdraw'	, THREEx.ConvertArguments.toBoolean)
	injectAttr('needsUpdate', THREEx.ConvertArguments.toBoolean)			
})();


