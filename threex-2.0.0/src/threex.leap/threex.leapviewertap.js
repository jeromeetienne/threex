THREEx.LeapViewerTap	= function(opts){
	// handle arguments
	opts		= opts	|| {}
	var container	= opts.container	|| console.assert(false)
	var controller	= opts.controller	|| console.assert(false)
	var loop	= opts.loop		|| console.assert(false)
	console.assert(container instanceof THREE.Object3D)
	console.assert(controller instanceof THREEx.LeapController)
	console.assert(loop instanceof THREEx.Loop)

	// listen to gestureTracking event
	controller.addEventListener('gestureTracking', function(gesture, data){
		var userData	= data.userData;
		// keep only keyTap gesture
		if( gesture.type !== 'keyTap' && gesture.type !== 'screenTap')		return;


		// create the sphere for the contact point
		var geometry	= new THREE.SphereGeometry(0.15, 16, 16);
		var material	= new THREE.MeshBasicMaterial({
			color	: Math.random() * 0xffffff
		});
		var sphere	= new THREE.Mesh( geometry, material );	
		sphere.position	= controller.convertPosition(gesture.position)
		container.add(sphere)

		// create the riddle for impact
		var geometry	= new THREE.TorusGeometry(0.15,0.01, 8, 32);
		var material	= new THREE.MeshBasicMaterial({
			color	: Math.random() * 0xffffff
		});
		var torus	= new THREE.Mesh( geometry, material );
		sphere.add(torus)
		if( gesture.type === 'keyTap')	torus.rotation.x = Math.PI/2

		// make the torus grow
		var callback	= loop.hook(function(delta, now){
			var factor	= 1 + delta * 2;
			torus.scale.x	*= factor;
			if( gesture.type === 'keyTap')	torus.scale.z	*= factor
			else				torus.scale.y	*= factor
		})
		// remove it after 300ms
		setTimeout(function(){
			loop.unhook(callback)
			sphere.parent.remove(sphere)
		}, 300)
	})
}