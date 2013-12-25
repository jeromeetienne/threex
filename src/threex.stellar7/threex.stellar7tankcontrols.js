var THREEx	= THREEx	|| {}

THREEx.Stellar7TankControls	= function(tank){
	// internal render function
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		controls							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var gunSpeed	= 0
	onRenderFcts.push(function(delta, now){
		var angle	= gunSpeed * delta
		tank.cannonMesh.rotation.y	+= angle
	}.bind(this))
	
	var turnSpeed	= 0
	onRenderFcts.push(function(delta, now){
		var angle	= turnSpeed * delta
		tank.baseMesh.rotation.y	+= angle
	}.bind(this))

	var moveSpeed	= 0
	onRenderFcts.push(function(delta, now){
		var velocity	= new THREE.Vector3(0, 0, moveSpeed*delta);
		var matrix	= new THREE.Matrix4().makeRotationY(tank.baseMesh.rotation.y);
		velocity.applyMatrix4( matrix );
		tank.baseMesh.position.add(velocity);
	}.bind(this))
	
	//////////////////////////////////////////////////////////////////////////////////
	//		handle inputs							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var inputs	= {
		turnRight	: false,
		turnLeft	: false,
		moveAhead	: false,
		moveBack	: false,
		gunRight	: false,
		gunLeft		: false,
	}
	this.inputs	= inputs
	onRenderFcts.push(function(delta, now){
		if( inputs.turnRight )		turnSpeed	= -Math.PI/4
		else if( inputs.turnLeft )	turnSpeed	= +Math.PI/4
		else				turnSpeed	= 0

		if( inputs.moveAhead )		moveSpeed	= +1
		else if( inputs.moveBack )	moveSpeed	= -1
		else				moveSpeed	= 0

		if( inputs.gunRight )		gunSpeed	= -Math.PI/4
		else if( inputs.gunLeft )	gunSpeed	= +Math.PI/4
		else				gunSpeed	= 0
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		expose .inputs as function					//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.turn	= function(direction){
		inputs.turnRight	= direction > 0 ? true : false
		inputs.turnLeft		= direction < 0 ? true : false
	}
	this.turnRight	= function(){ this.turn(+1)	}.bind(this)
	this.turnLeft	= function(){ this.turn(-1)	}.bind(this)
	this.turnStop	= function(){ this.turn( 0)	}.bind(this)
	
	this.move	= function(direction){
		inputs.moveAhead	= direction > 0 ? true : false
		inputs.moveBack		= direction < 0 ? true : false
	}
	this.moveAhead	= function(){ this.move(-1)	}.bind(this)
	this.moveBack	= function(){ this.move(+1)	}.bind(this)
	this.moveStop	= function(){ this.move( 0)	}.bind(this)
	
	this.gun	= function(direction){
		inputs.gunRight	= direction > 0 ? true : false
		inputs.gunLeft	= direction < 0 ? true : false
	}
	this.gunRight	= function(){ this.gun(+1)	}.bind(this)
	this.gunLeft	= function(){ this.gun(-1)	}.bind(this)
	this.gunStop	= function(){ this.gun( 0)	}.bind(this)
}
