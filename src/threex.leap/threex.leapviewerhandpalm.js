THREEx.LeapViewerHandPalm	= function(opts){
	// handle arguments
	opts		= opts	|| {}
	var container	= opts.container	|| console.assert(false)
	var controller	= opts.controller	|| console.assert(false)
	console.assert(container instanceof THREE.Object3D)
	console.assert(controller instanceof THREEx.LeapController)
	
	// listen to handTracking event
	controller.addEventListener('handTracking', function(hand, data){
		//console.log('hand start', hand.id, hand)
		var userData	= data.userData;		
		// create the container
		var mesh	= new THREE.Object3D()
		userData.mesh	= mesh;	
		container.add(mesh)
		// add the ring	
		var color	= new THREE.Color(Math.random() * 0xffffff);
		var geometry	= new THREE.RingGeometry(0.7, 1, 32);
		var material	= new THREE.MeshBasicMaterial()
		material.color.copy(color)
		material.side	= THREE.DoubleSide;
		var circle	= new THREE.Mesh(geometry, material)
		mesh.add(circle)
		// add the arrow for the normal		
		var direction	= new THREE.Vector3(0,0,-1)
		var position	= new THREE.Vector3(0,0,0)
		var length	= 1;
		var arrow	= new THREE.ArrowHelper(direction, position, length, color);
		mesh.add(arrow)

		function onUpdate(hand, data){
			// update position
			var position	= controller.convertPosition(hand.palmPosition)
			mesh.position.copy(position)
			// update circle radius			
			var radius	= controller.convertDistance(hand.sphereRadius*0.7)
			mesh.scale.set(radius, radius, radius)
			// update circle orientation
			var normal	= new THREE.Vector3(hand.palmNormal[0], hand.palmNormal[1], hand.palmNormal[2]);
			var target	= new THREE.Vector3(hand.palmPosition[0], hand.palmPosition[1], hand.palmPosition[2])
			target		= controller.convertPosition(target.sub(normal))
			mesh.lookAt(target)			
		}
		// initial update
		onUpdate(hand, data)
		// bind update event
		data.emitter.addEventListener('update', onUpdate.bind(this));	
		// handle stop event
		data.emitter.addEventListener('stop', function(handId, data){
			mesh.parent.remove(mesh);
		})
	})
}
