var THREEx	= THREEx	|| {}

THREEx.PepperNode2	= function(name, generation, scene){
	// handle structure
	this.name	= name
	this.generation	= generation
	this.radius	= 1/generation
	this.parent	= null
	this.children	= []

	// update functions
	var onRenderFcts	= []
	this.update	= function(delta,now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}

	// var domElement	= document.createElement( 'div' );
	// domElement.style.backgroundColor	= 'red'
	// domElement.style.width	= (128+22 /* because sprite isnt full image */)*this.radius+"px"
	// domElement.style.height	= (128+22 /* because sprite isnt full image */)*this.radius+"px"
	// domElement.style.textAlign	= 'center'
	// domElement.innerHTML		= this.name	


	var mustacheTemplate	= jQuery('#pepperNodeTemplate').html()
	var html		= Mustache.render(mustacheTemplate, this)
	var domElement		= jQuery(html).get(0)
	domElement.style.width	= (128+22 /* because sprite isnt full image */)*this.radius+"px"
	domElement.style.height	= (128+22 /* because sprite isnt full image */)*this.radius+"px"

	// visualisation build object3d
	// var domElement	= document.createElement( 'img' );
	// domElement.src	= 'css3d_molecules/images/ball.png';
	// domElement.title= name
	// domElement.width	= (128+22 /* because sprite isnt full image */)*this.radius
	// domElement.height	= (128+22 /* because sprite isnt full image */)*this.radius
	var object3d	= new THREE.CSS3DSprite( domElement );
	this.object3d	= object3d
	scene.add(object3d)
	// export position alias
	this.position	= object3d.position

	var css3DJoint		= null
	onRenderFcts.push(function(delta, now){
		if( css3DJoint === null )	return
		console.assert(this.parent);

		css3DJoint.srcMargin	= 128/2 * (1/generation)
		css3DJoint.dstMargin	= 128/2 * (1/this.parent.generation)
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

	this.setGeneration	= function(newGeneration, originNode){
		generation	= newGeneration
		this.generation	= generation
		this.radius	= 1/generation
		
		domElement.style.width	= (128+22 /* because sprite isnt full image */)*this.radius+"px"
		domElement.style.height	= (128+22 /* because sprite isnt full image */)*this.radius+"px"


		if( this.parent && this.parent !== originNode ){
			this.parent.setGeneration(newGeneration+1, this)
		}
		for(var i = 0; i < this.children.length; i++){
			if( this.children[i] === originNode )	continue;
			this.children[i].setGeneration(newGeneration+1, this)
		}
	}
}
