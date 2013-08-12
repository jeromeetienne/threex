var THREEx = THREEx || {}

THREEx.Htmlmixer	= function(frontRenderer, scene, camera){
	// update functions
	var updateFcts	= []
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	

	var rendererCSS	= new THREE.CSS3DRenderer()
	// TODO to make generic
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position	= 'absolute'
	rendererCSS.domElement.style.top	= 0
	rendererCSS.domElement.style.margin	= 0
	rendererCSS.domElement.style.padding	= 0
	rendererCSS.domElement.style.zIndex	= -1
	document.body.appendChild( rendererCSS.domElement )

	if( frontRenderer.domElement.parentElement ){
		renderer.domElement.parentElement.removeChild(frontRenderer.domElement)
	}
	rendererCSS.domElement.appendChild( frontRenderer.domElement )
	this.frontRenderer	= frontRenderer
	frontRenderer.domElement.style.position	= 'absolute'
	frontRenderer.domElement.style.top	= 0
	frontRenderer.domElement.style.margin	= 0
	frontRenderer.domElement.style.padding	= 0

	// build cssCamera
	var cssFactor	= 100
	this.cssFactor	= cssFactor
	var cssCamera	= new THREE.PerspectiveCamera(camera.fov, camera.aspect, camera.near*cssFactor, camera.far*cssFactor);
	cssCamera.quaternion	= camera.quaternion
	updateFcts.push(function(delta, now){
		cssCamera.position
			.copy(camera.position)
			.multiplyScalar(cssFactor)
	})


	// create a new scene to hold CSS
	var cssScene = new THREE.Scene();
	this.cssScene= cssScene
	
	updateFcts.push(function(delta, now){
		rendererCSS.render(cssScene, cssCamera)
	})
}

THREEx.Htmlmixer.Plane = function(htmlmixer, domElement, opts) {	
	opts		= opts	|| {}
	// opts.elementW	= opts.elementW	!== undefined	? opts.elementW	: 1024
	// opts.planeW	= opts.planeW !== undefined	? opts.planeW	: 360
	// opts.planeH	= opts.planeH !== undefined	? opts.planeH	: 240

	opts.elementW	= opts.elementW	!== undefined	? opts.elementW	: 1024
	opts.planeW	= opts.planeW !== undefined	? opts.planeW	: 1
	opts.planeH	= opts.planeH !== undefined	? opts.planeH	: 3/4

	var planeW	= opts.planeW
	var planeH	= opts.planeH
	var planeMaterial   = new THREE.MeshBasicMaterial({
		opacity	: 0,
		color	: new THREE.Color('black'),
		blending: THREE.NoBlending,
		side	: THREE.DoubleSide
	})
	var geometry	= new THREE.PlaneGeometry( opts.planeW, opts.planeH )
	var object3d	= new THREE.Mesh( geometry, planeMaterial )
	this.object3d	= object3d


	// width of iframe in pixels
	var aspectRatio		= planeH / planeW
	var elementWidth	= opts.elementW;
	var elementHeight	= elementWidth * aspectRatio
	domElement.style.width	= elementWidth  + "px";
	domElement.style.height	= elementHeight + "px";

	// create a CSS3DObject to display element
	var cssObject		= new THREE.CSS3DObject( domElement )
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.quaternion	= object3d.quaternion

	cssObject.scale.set(1,1,1)
		.multiplyScalar(htmlmixer.cssFactor/(elementWidth/planeW))

	object3d.addEventListener('added', function(event){
		updateFcts.push(function(delta, now){
			// TODO compute world position and use it
			cssObject.position
				.copy(object3d.position)
				.multiplyScalar(htmlmixer.cssFactor)

			var scale	= elementWidth/(geometry.width*object3d.scale.x)
			cssObject.scale.set(1,1,1).multiplyScalar(htmlmixer.cssFactor/scale)
		})
		htmlmixer.cssScene.add(cssObject)
	})
	object3d.addEventListener('removed', function(event){
		console.error('not yet implemented')
	})
};


/**
 * create a THREEx.HtmlmixedPlane for an iframe
 * 
 * @param  {String} url  the url for the iframe
 * @param  {Object} opts the options for THREEx.HtmlmixerPlane constructor
 * @return {THREEx.HtmlmixerPlane}      the object just created
 */
THREEx.Htmlmixer.createPlaneFromIframe	= function(htmlmixer, url, opts){
	// create the iframe element
	var domElement	= document.createElement('iframe')
	domElement.src	= url
	domElement.style.border	= 'none'
	// create the THREEx.HtmlmixerPlane for that
	return new THREEx.Htmlmixer.Plane(htmlmixer, domElement, opts)
}

/**
 * create a THREEx.HtmlmixedPlane for an iframe
 * 
 * @param  {String} url  the url for the iframe
 * @param  {Object} opts the options for THREEx.HtmlmixerPlane constructor
 * @return {THREEx.HtmlmixerPlane}      the object just created
 */
THREEx.Htmlmixer.createPlaneFromImage	= function(htmlmixer, url, opts){
	// create the iframe element
	var domElement	= document.createElement('img')
	domElement.src	= url
	// create the THREEx.HtmlmixerPlane for that
	return new THREEx.Htmlmixer.Plane(htmlmixer, domElement, opts)
}


