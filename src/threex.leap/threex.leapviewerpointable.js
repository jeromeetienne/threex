THREEx.LeapViewerPointable	= function(opts){
	// handle arguments
	opts		= opts	|| {}
	var container	= opts.container	|| console.assert(false)
	var controller	= opts.controller	|| console.assert(false)
	console.assert(container instanceof THREE.Object3D)
	console.assert(controller instanceof THREEx.LeapController)

	// listen to pointableTracking event
	controller.addEventListener('pointableTracking', function(pointable, data){
		var userData	= data.userData;
		// create initial mesh
		var direction	= controller.toVector3(pointable.direction)
		var length	= controller.convertDistance(pointable.length)
		var position	= controller.convertPosition(pointable.tipPosition)
		var color	= Math.random() * 0xffffff;
		var mesh	= new THREE.ArrowHelper(direction, position, length, color);
		userData.mesh	= mesh;
		container.add(mesh)


		data.emitter.addEventListener('update', function(pointable, data){
			// update position
			var position	= controller.convertPosition(pointable.tipPosition)
			mesh.position.copy(position)
			// update direction
			var direction	= controller.toVector3(pointable.direction)
			mesh.setDirection(direction)
			// update length
			var length	= controller.convertDistance(pointable.length)
			mesh.setLength(length)
		});

		data.emitter.addEventListener('stop', function(pointableId, data){
			mesh.parent.remove(mesh)
		})
	})
}
