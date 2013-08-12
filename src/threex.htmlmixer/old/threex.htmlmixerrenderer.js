var THREEx = THREEx || {}

THREEx.HtmlmixerRenderer	= function(frontRenderer){
	this.frontRenderer	= frontRenderer

	var rendererCSS	= new THREE.CSS3DRenderer()
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position	= 'absolute'
	rendererCSS.domElement.style.top	= 0
	rendererCSS.domElement.style.margin	= 0
	rendererCSS.domElement.style.padding	= 0
	rendererCSS.domElement.style.zIndex	= -1
	document.body.appendChild( rendererCSS.domElement )

	rendererCSS.domElement.appendChild( frontRenderer.domElement )

	frontRenderer.domElement.style.position	= 'absolute'
	frontRenderer.domElement.style.top	= 0
	frontRenderer.domElement.style.margin	= 0
	frontRenderer.domElement.style.padding	= 0

	this.render	= function(scene, camera){
		scene.updateMatrixWorld()
		rendererCSS.render( scene, camera )
	}
}