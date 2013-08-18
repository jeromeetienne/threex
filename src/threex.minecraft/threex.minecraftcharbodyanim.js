THREEx.createMinecraftCharBodyAnimations	= function(character){
	return new THREEx.MinecraftCharBodyAnimations(character);
}

THREEx.MinecraftCharBodyAnimations	= function(character){
	var animations	= this;
	// call parent ctor
	THREEx.Animations.call(this)
	var tweenAngle	= function(baseValue, nextValue, timePercent){
		// compute the nextValue to get the shortest path - assume it is an angle
		if( nextValue - baseValue > +Math.PI )	nextValue -= Math.PI*2;
		if( nextValue - baseValue < -Math.PI )	nextValue += Math.PI*2;
		return (1-timePercent) * baseValue + timePercent * nextValue;
	}

	
	var onUpdate	= function(position){
		character.armR.rotation.z	= position.armRRotationZ;
		character.armL.rotation.z	= position.armLRotationZ;

		character.armR.rotation.x	=  position.armRotationX;
		character.armL.rotation.x	= -position.armRotationX;

		character.legR.rotation.x	=  position.legRotationX;
		character.legL.rotation.x 	= -position.legRotationX;
	};
	var onCapture	= function(position){
		position.armLRotationZ	= character.armL.rotation.z;
		position.armRRotationZ	= character.armR.rotation.z;
		position.armRotationX	= character.armR.rotation.x;
		position.legRotationX	= character.legR.rotation.x;
	};
	var propTweens	= {
		armLRotationZ	: tweenAngle,
		armRRotationZ	: tweenAngle,
		armRotationX	: tweenAngle,
		legRotationX	: tweenAngle		
	}
	
	
	// Setup 'run' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('run'	, THREEx.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: +angleRange,
		legRotationX	: -angleRange			
	}).pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: -angleRange,
		legRotationX	: +angleRange
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'walk' animation
	var angleRange	= Math.PI/3-Math.PI/10;
	animations.add('walk'	, THREEx.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/30,
		armRRotationZ	: -Math.PI/30,
		armRotationX	: +angleRange,
		legRotationX	: -angleRange		
	}).pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/30,
		armRRotationZ	: -Math.PI/30,
		armRotationX	: -angleRange,
		legRotationX	: +angleRange
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'stand' animation
	animations.add('stand', THREEx.createAnimation().pushKeyframe(0.3, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: 0,
		legRotationX	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'wave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('wave'	, THREEx.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: 0,
		armRRotationZ	: Math.PI+2*Math.PI/5,
		armRotationX	: 0,
		legRotationX	: 0			
	}).pushKeyframe(0.5, {
		armLRotationZ	: 0,
		armRRotationZ	: Math.PI+Math.PI/10,
		armRotationX	: 0,
		legRotationX	: 0			
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'hiwave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('hiwave'	, THREEx.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: Math.PI-3*Math.PI/5,
		armRRotationZ	: Math.PI+3*Math.PI/5,
		armRotationX	: 0,
		legRotationX	: 0			
	}).pushKeyframe(0.5, {
		armLRotationZ	: Math.PI-Math.PI/10,
		armRRotationZ	: Math.PI+Math.PI/10,
		armRotationX	: 0,
		legRotationX	: 0			
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'circularPunch' animation
	var delay	= 1/5;
	animations.add('circularPunch'	, THREEx.createAnimation().pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: 0,
		legRotationX	: 0
	}).pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: -Math.PI/2,
		legRotationX	: 0
	}).pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: -Math.PI,
		legRotationX	: 0
	}).pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: +Math.PI/2,
		legRotationX	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'rightPunch' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('rightPunch', THREEx.createAnimation().pushKeyframe(0.1, {
		armLRotationZ	: +Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: 0,
		legRotationX	: 0
	}).pushKeyframe(0.3, {
		armLRotationZ	: -Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: +Math.PI/2+Math.PI/5,
		legRotationX	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));
}

THREEx.MinecraftCharBodyAnimations.prototype	= Object.create(THREEx.Animations.prototype);
