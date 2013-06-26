var THREEx	= THREEx	|| {}
/**
 * display the main point of the curve
 * 
 * @param  {THREE.Curve} curve the curve to display
 * @param  {nStep} curve the number of steps to display
 */
THREEx.CurveHelper	= function(curve, nSteps){
	// build geometry
	var geometry	= new THREE.Geometry();
	for(var i = 0; i < nSteps; i++){
		var vector3	= curve.getPointAt(i/nSteps)
		geometry.vertices.push(vector3)
	}
	// handle the closed case
	var isClosed	= false
	isClosed	|= curve instanceof THREE.ClosedSplineCurve3
	if( isClosed ){
		var vector3	= curve.getPointAt(0)
		geometry.vertices.push(vector3)
	}
	// build container
	var container	= new THREE.Object3D()
	// build the line
	var material	= new THREE.LineBasicMaterial()
	var line	= new THREE.Line(geometry, material)
	container.add(line)
	// build a particle for each points
	var material	= new THREE.ParticleBasicMaterial({
		size		: 3, 
		sizeAttenuation	: false, 
	})
	var particles	= new THREE.ParticleSystem( geometry.clone(), material )
	container.add(particles)
	// return the container
	return container
}
