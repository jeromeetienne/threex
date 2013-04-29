/** @namespace */
var THREEx	= THREEx || {};

THREEx.AdaptativeNormalizer	= function(factorForMin, factorForMax){
	factorForMin	= factorForMin !== undefined ? factorForMin : 0.99;
	factorForMax	= factorForMax !== undefined ? factorForMax : 0.99;
	var minThreshold	= null;
	var maxThreshold	= null;
	this.update	= function(value){
		// set initial value of min/max threshold
		minThreshold	= minThreshold !== null ? minThreshold : value;
		maxThreshold	= maxThreshold !== null ? maxThreshold : value;
		// recompute minThreshold if needed
		if( value < minThreshold ){
			minThreshold	+= (value-minThreshold)*factorForMin
			value		= minThreshold;			
		} 
		// recompute maxThreshold if needed
		if( value > maxThreshold ){
			maxThreshold	+= (value-maxThreshold)*factorForMax
			value		= maxThreshold
		}
		// to avoid division by zero
		if( maxThreshold === minThreshold )	return value;
		// compute normalized value
		var normalized	= (value - minThreshold) / (maxThreshold-minThreshold);
		// return the just built normalized value between [0, 1]
		return normalized;
	}
}

