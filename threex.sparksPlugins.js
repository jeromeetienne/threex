var THREEx		= THREEx 	|| {};
THREEx.SparksPlugins	= {};

THREEx.SparksPlugins.InitColor	= function(color){
	this.initialize = function( emitter, particle ){
		particle.target.color().copy( color );
	};
};

THREEx.SparksPlugins.InitSize	= function(size){
	this.initialize = function( emitter, particle ){
		particle.target.size(size);
	};
};

THREEx.SparksPlugins.ActionLinearColor	= function(colorSrc, colorDst, deltaSeconds){
	var colorInc	= new THREE.Color();
	colorInc.r	= (colorDst.r - colorSrc.r) / deltaSeconds;
	colorInc.g	= (colorDst.g - colorSrc.g) / deltaSeconds;
	colorInc.b	= (colorDst.b - colorSrc.b) / deltaSeconds;
	this.update	= function( emitter, particle, time ){
		var color	= particle.target.color();
		color.r		+= colorInc.r * time;
		color.g		+= colorInc.g * time;
		color.b		+= colorInc.b * time;
	};
};

THREEx.SparksPlugins.ActionLinearSize	= function(sizeSrc, sizeDst, deltaSeconds){
	var sizeInc	= ( sizeDst - sizeSrc ) / deltaSeconds;
	this.update	= function( emitter, particle, time ){
		var size	= particle.target.size();
		size	+= sizeInc * time;
		particle.target.size( size );
	};
};
