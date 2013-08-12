var THREEx = THREEx || {}

/**
 * @todo  make a .update() for scale ?
 * 
 * @param  {[type]} domElement [description]
 * @return {[type]}            [description]
 */
THREEx.HtmlmixerPlane	= function(domElement, opts){
	opts		= opts	|| {}
	// opts.elementW	= opts.elementW	!== undefined	? opts.elementW	: 1024
	// opts.planeW	= opts.planeW !== undefined	? opts.planeW	: 360
	// opts.planeH	= opts.planeH !== undefined	? opts.planeH	: 240

	opts.elementW	= opts.elementW	!== undefined	? opts.elementW	: 512
	opts.planeW	= opts.planeW !== undefined	? opts.planeW	: 360
	opts.planeH	= opts.planeH !== undefined	? opts.planeH	: 240

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

	// force iframe to have same relative dimensions as geometry
	var aspectRatio		= opts.planeH / opts.planeW
	var elementH		= opts.elementW * aspectRatio
	domElement.style.width	= opts.elementW + "px"
	domElement.style.height	= elementH + "px"

	// create a CSS3DObject to display element
	var objectCSS		= new THREE.CSS3DObject( domElement )
	this.objectCSS		= objectCSS
	// synchronize objectCSS position/rotation with planeMesh position/rotation 
	objectCSS.position	= object3d.position
	objectCSS.quaternion	= object3d.quaternion
	// resize this.objectCSS to same size as this.object3d
	objectCSS.scale.x	/= opts.elementW / opts.planeW
	objectCSS.scale.y	/= opts.elementW / opts.planeW
}

/**
 * create a THREEx.HtmlmixedPlane for an iframe
 * 
 * @param  {String} url  the url for the iframe
 * @param  {Object} opts the options for THREEx.HtmlmixerPlane constructor
 * @return {THREEx.HtmlmixerPlane}      the object just created
 */
THREEx.HtmlmixerPlane.createFromIframe	= function(url, opts){
	// create the iframe element
	var domElement	= document.createElement('iframe')
	domElement.src	= url
	domElement.style.border	= 'none'
	// create the THREEx.HtmlmixerPlane for that
	return new THREEx.HtmlmixerPlane(domElement, opts)
}