THREEx.LeapViewerHandSphere	= function(opts){
	// handle arguments
	opts		= opts	|| {}
	var container	= opts.container	|| console.assert(false)
	var controller	= opts.controller	|| console.assert(false)
	console.assert(container instanceof THREE.Object3D)
	console.assert(controller instanceof THREEx.LeapController)
	
	// listen to handTracking event
	controller.addEventListener('handTracking', function(hand, data){
		var userData	= data.userData;
		// create initial mesh
		var geometry	= new THREE.SphereGeometry(0.5, 32, 32);
		var material	= new THREE.MeshBasicMaterial();
		material.color.set(Math.random() * 0xffffff)
		material.wireframe	= true;
		var mesh	= new THREE.Mesh(geometry, material)
		container.add(mesh)

		function onUpdate(hand, data){
			// update mesh position		
			var position	= controller.convertPosition(hand.sphereCenter)
			mesh.position.copy(position)
			// update circle radius			
			var radius	= controller.convertDistance(hand.sphereRadius)	
			mesh.scale.set(radius, radius, radius)			
		}
		// initial update
		onUpdate(hand, data)
		// bind update event
		data.emitter.addEventListener('update', onUpdate.bind(this));
		// handle stop event
		data.emitter.addEventListener('stop', function(handId, data){
			mesh.parent.remove(mesh)
		})
	})
}
