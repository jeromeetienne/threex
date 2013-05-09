THREEx.LeapViewerSwipe	= function(opts){
	// handle arguments
	opts		= opts	|| {}
	var container	= opts.container	|| console.assert(false)
	var controller	= opts.controller	|| console.assert(false)
	console.assert(container instanceof THREE.Object3D)
	console.assert(controller instanceof THREEx.LeapController)

	// listen to gestureTracking event
	controller.addEventListener('gestureTracking', function(gesture, data){
		var userData	= data.userData;
		// keep only swipe gesture
		if( gesture.type !== 'swipe' )		return;

		// create initial mesh
		var origin	= controller.convertPosition(gesture.startPosition)
		var position	= controller.convertPosition(gesture.position)
		var length	= position.distanceTo(origin)
		var direction	= position.clone().sub(origin).normalize()
		var color	= Math.random() * 0xffffff
		var mesh	= new THREE.ArrowHelper(direction, origin, length, color)
		userData.mesh	= mesh;
		container.add(mesh)

		// update the mesh as the gesture is updated
		data.emitter.addEventListener('update', function(gesture, data){
			// update position
			var origin	= controller.convertPosition(gesture.startPosition)
			mesh.position	= origin
			// update length
			var position	= controller.convertPosition(gesture.position)
			var length	= position.distanceTo(origin)
			mesh.setLength( length );
			// update direction
			var direction	= position.clone().sub(origin).normalize()
			mesh.setDirection( direction );
		})
			
		// remove the mesh
		data.emitter.addEventListener('stop', function(gesture, data){
			mesh.parent.remove(mesh);
		})
	})
};

