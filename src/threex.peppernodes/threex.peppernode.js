var THREEx	= THREEx	|| {}

THREEx.PepperNode	= function(name, generation, scene){
	// handle structure
	this.name	= name
	this.generation	= generation
	this.radius	= 1/(generation+1)
	this.parent	= null
	this.children	= []

	// update functions
	var onRenderFcts	= []
	this.update	= function(delta,now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}

	// visualisation build object3d
	var domElement	= document.createElement( 'img' );
	domElement.src	= 'css3d_molecules/images/ball.png';
	domElement.width	= 128*this.radius
	domElement.height	= 128*this.radius
	domElement.title= name
	var object3d	= new THREE.CSS3DSprite( domElement );
	this.object3d	= object3d
	scene.add(object3d)
	// export position alias
	this.position	= object3d.position

	var css3DJoint		= null
	onRenderFcts.push(function(delta, now){
		if( css3DJoint === null )	return

		css3DJoint.update()
	}.bind(this))

	this.setParent	= function(newParent){
		if( css3DJoint ){
			scene.remove(css3DJoint.object3d)
			css3DJoint	= null
		}

		// remove this node from parent.children
		if( this.parent ){
			var index	= this.parent.children.indexOf(this)
			console.assert(index !== -1 )
			this.parent.children.splice(index, 1);
		}
		// update local parent reference
		this.parent	= newParent

		// add this node into newParent if any
		if( this.parent )	this.parent.children.push(this)

		// add a joint between this node and the parent
		if( this.parent ){
			console.assert(css3DJoint === null)
			css3DJoint	= new THREEx.CSS3DJoint(this.position, this.parent.position)
			scene.add(css3DJoint.object3d)
		}
	}
}
