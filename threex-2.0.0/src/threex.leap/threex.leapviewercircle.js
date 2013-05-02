THREEx.LeapViewerCircle	= function(opts){
	// handle arguments
	opts		= opts	|| {}
	var container	= opts.container	|| console.assert(false)
	var controller	= opts.controller	|| console.assert(false)
	console.assert(container instanceof THREE.Object3D)
	console.assert(controller instanceof THREEx.LeapController)
	
	// listen to gestureTracking event
	controller.addEventListener('gestureTracking', function(gesture, data){
		var userData	= data.userData;
		// keep only circle gesture
		if( gesture.type !== 'circle' )		return;

		// create the container
		var mesh	= new THREE.Object3D()
		userData.mesh	= mesh;	
		container.add(mesh)
		// add the ring	
		var color	= new THREE.Color(Math.random() * 0xffffff)
		var geometry	= new THREE.RingGeometry(0.7, 1, 32);
		var material	= new THREE.MeshBasicMaterial();
		material.color.copy(color)
		material.side	= THREE.DoubleSide
		var circle	= new THREE.Mesh(geometry, material)
		mesh.add(circle)

		// add the arrow for the normal		
		var direction	= new THREE.Vector3(0,0,1)
		var position	= new THREE.Vector3(0,0,0)
		var length	= 1;
		var arrow	= new THREE.ArrowHelper(direction, position, length, color);
		mesh.add(arrow)

		function onUpdate(gesture, data){
			// update position
			var position	= controller.convertPosition(gesture.center)
			mesh.position.copy(position)
			// update circle radius			
			var radius	= controller.convertDistance(gesture.radius)
			mesh.scale.set(radius, radius, radius)
			// update circle orientation
			var normal	= new THREE.Vector3(gesture.normal[0], gesture.normal[1], gesture.normal[2]);
			var target	= new THREE.Vector3(gesture.center[0], gesture.center[1], gesture.center[2])
			target		= controller.convertPosition(target.sub(normal))
			mesh.lookAt(target)
		}
		// initial update
		onUpdate(gesture, data)
		// bind update event
		data.emitter.addEventListener('update', onUpdate.bind(this));	
		// remove the mesh
		data.emitter.addEventListener('stop', function(gesture, data){
			mesh.parent.remove(mesh);
		})
	})
}
