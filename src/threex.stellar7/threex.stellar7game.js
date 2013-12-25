var THREEx	= THREEx	|| {}

THREEx.Stellar7Game	= function(scene){
	// internal render function
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var players	= []
	var shoots	= []
	
	this.addPlayer	= function(player){
		players.push(player)
		scene.add(player.model.object3d)
		onRenderFcts.push(function(delta, now){
			player.update(delta, now)
		})
		player.addEventListener('fire', function(){
			var shoot	= new THREEx.Stellar7Shoot.fromTank(player.model)
			scene.add( shoot.object3d )
			onRenderFcts.push(function(delta, now){
				shoot.update(delta, now)
			})
		})
	}

	onRenderFcts.push(function(delta, now){
		players.forEach(function(player){
			player.update(delta, now)
		})
	})

	onRenderFcts.push(function(delta, now){
		shoots.forEach(function(shoot){
			shoot.update(delta, now)
		})
	})
}
