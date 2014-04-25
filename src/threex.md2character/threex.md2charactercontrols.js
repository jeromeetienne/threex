var THREEx	= THREEx || {}


THREEx.MD2CharacterControls	= function(object3d, inputs){
	// update function
	var onRenderFcts= [];
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}
	// exports the inputs
	this.inputs	= inputs	|| {
		right	: false,
		left	: false,
		up	: false,
		down	: false,
	}
	inputs		= this.inputs

	// parameters
	this.angularSpeed	= Math.PI*2*0.5
	this.linearSpeed	= 2.5

	onRenderFcts.push(function(delta, now){
		if( inputs.right )	object3d.rotation.y	-= this.angularSpeed*delta
		if( inputs.left )	object3d.rotation.y	+= this.angularSpeed*delta

		// up/down
		var distance	= 0;
		if( inputs.up )		distance	= +this.linearSpeed * delta;
		if( inputs.down )	distance	= -this.linearSpeed * delta;
		if( distance ){
			var velocity	= new THREE.Vector3(0, 0, distance);
			var matrix	= new THREE.Matrix4().makeRotationY(object3d.rotation.y);
			velocity.applyMatrix4( matrix );
			object3d.position.add(velocity);
		}
	}.bind(this))
}