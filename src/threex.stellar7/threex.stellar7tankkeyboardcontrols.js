var THREEx	= THREEx	|| {}

/**
 * controls the tank with the keyboard
 */
THREEx.Stellar7TankKeyboardControls	= function(keyboard, tankControls){
	
	this.update	= function(delta, now){
		var inputs	= tankControls.inputs
		inputs.turnLeft	= keyboard.pressed('a')
		inputs.turnRight= keyboard.pressed('d')
		inputs.moveAhead= keyboard.pressed('w')
		inputs.moveBack	= keyboard.pressed('s')

		inputs.gunLeft	= keyboard.pressed('q')
		inputs.gunRight	= keyboard.pressed('e')
	}

	// only on keydown + no repeat
	var wasPressed	= {};
	keyboard.domElement.addEventListener('keydown', function(event){
		if( keyboard.eventMatches(event, 'space') && !wasPressed['space'] ){
			wasPressed['space']	= true;
			// TODO how to link that to the fire model
			console.log('FIRE')
		}
	})	
	// listen on keyup to maintain ```wasPressed``` array
	keyboard.domElement.addEventListener('keyup', function(event){
		if( keyboard.eventMatches(event, 'space') ){
			wasPressed['space']	= false;
		}
	})

}