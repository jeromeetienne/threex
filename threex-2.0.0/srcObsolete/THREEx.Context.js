var THREEx	= THREEx || {};

THREEx.Context	= function(){
	this.userData	= {}
	// setup the rendering loop
	this.loop	= new THREEx.Loop()
	// setup the scene
	var scene	= new THREE.Scene()
	this.scene	= scene

	// setup the camera
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 3;
	// expose it
	this.camera	= camera;

	// setup the renderer
	var renderer	= new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );	
	// expose it
	this.renderer	= renderer;
	
	this.hook(function(delta, now){
		renderer.render( scene, camera );
	})
}

typeof(mixinCreatorPattern) === 'undefined' || mixinCreatorPattern(THREEx.Context, 'THREEx_Context')


//////////////////////////////////////////////////////////////////////////////////
//		THREEx.Loop shortcuts						//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Context.prototype.start	= function(){
	this.loop.start.apply(this.loop, arguments)
	return this;	// for chained API
}

THREEx.Context.prototype.hook	= function(){
	this.loop.hook.apply(this.loop, arguments)
	return this;	// for chained API
}