var THREEx = THREEx || {}

THREEx.Htmlmixer	= function(frontRenderer){


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

	
	var cssFactor	= 100
	var cssCamera	= new THREE.PerspectiveCamera(camera.fov, camera.aspect, camera.near*cssFactor, camera.far*cssFactor);
	updateFcts.push(function(delta, now){
		cssCamera.quaternion	= cssCamera.quaternion
		cssCamera.position
			.copy(camera.position)
			.multiplyScalar(cssFactor)
	})


	// create a new scene to hold CSS
	var cssScene = new THREE.Scene();

	
	this.render	= function(scene, camera){
		scene.updateMatrixWorld()
		rendererCSS.render(cssScene, camera )
	}
}

THREEx.Htmlmixer.prototype.createPlane = function() {
	
	this.destroy	= function(){
		
	}
};


