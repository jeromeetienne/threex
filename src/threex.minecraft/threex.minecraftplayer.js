var THREEx	= THREEx	|| {}

THREEx.MinecraftPlayer	= function(){
	
	//////////////////////////////////////////////////////////////////////////////////
	//		update functions						//
	//////////////////////////////////////////////////////////////////////////////////
	
	var updateFcts= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}.bind(this)	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		character							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var character	= new THREEx.MinecraftChar()
	this.character	= character
	scene.add(character.root)
	
	//////////////////////////////////////////////////////////////////////////////////
	//		animation							//
	//////////////////////////////////////////////////////////////////////////////////
			
	var headAnims	= new THREEx.MinecraftCharHeadAnimations(character);
	this.headAnims	= headAnims
	updateFcts.push(function(delta, now){
		headAnims.update(delta, now)	
	})

	// init bodyAnims
	var bodyAnims	= new THREEx.MinecraftCharBodyAnimations(character);
	this.bodyAnims	= bodyAnims
	updateFcts.push(function(delta, now){
		bodyAnims.update(delta, now)	
	})
	
	//////////////////////////////////////////////////////////////////////////////////
	//		animation based on velocity					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var previousPos	= new THREE.Vector3();
	updateFcts.push(function(delta, now){
		var object3d	= character.root;
		var velocity	= object3d.position.clone().sub(previousPos);
		if( velocity.length() ){
			bodyAnims.start('run');
		}else{
			bodyAnims.start('stand');
	 	}
		// update player.previousPos/player.prevRotation
		previousPos.copy( object3d.position )
	});


	//////////////////////////////////////////////////////////////////////////////////
	//		controls							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var controls	= new THREEx.MinecraftControls(character.root)
	this.controls	= controls
	updateFcts.push(function(delta, now){
		controls.update(delta, now)
	})
}