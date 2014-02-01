var THREEx	= THREEx	|| {}

THREEx.SupermanArms	= function(){
	var onUpdateFcts= []
	this.update	= function(delta){
		onUpdateFcts.forEach(function(onUpdateFct){
			onUpdateFct(delta)
		})
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var object3d	= new THREE.Object3D()
	this.object3d	= object3d

	//////////////////////////////////////////////////////////////////////////////////
	//		left arm							//
	//////////////////////////////////////////////////////////////////////////////////
	var url		= THREEx.SupermanArms.baseUrl + 'images/armL.png'
	var material	= new THREE.SpriteMaterial({
		map			: THREE.ImageUtils.loadTexture(url),
		useScreenCoordinates	: true,
		alignment		: THREE.SpriteAlignment.bottomCenter,
	})
	var armL	= new THREE.Sprite( material )
	this.armL	= armL
	armL.scale.set(676, 439, 1)
	this.armL.position.set( window.innerWidth/2- 400, document.documentElement.clientHeight , 0)
	object3d.add( this.armL )

	//////////////////////////////////////////////////////////////////////////////////
	//		right arm							//
	//////////////////////////////////////////////////////////////////////////////////
	var url		= THREEx.SupermanArms.baseUrl + 'images/armR.png'
	var material	= new THREE.SpriteMaterial({
		map			: THREE.ImageUtils.loadTexture(url),
		useScreenCoordinates	: true,
		alignment		: THREE.SpriteAlignment.bottomCenter,
	})
	var armR	= new THREE.Sprite( material )
	this.armR	= armR
	armR.scale.set(676, 439, 1)
	object3d.add( this.armR );
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////


	var state	= 'rest'
	var startTime	= null
	var tweenDelay	= 1;
	armL.position.set( window.innerWidth/2- 400, document.documentElement.clientHeight+500 , 0);
	armR.position.set( window.innerWidth/2+ 400, document.documentElement.clientHeight+500 , 0);			

	onUpdateFcts.push(function(delta){
		var present	= Date.now()/1000
		if( present - startTime < tweenDelay ){
			var progress	= (present-startTime)/tweenDelay
		}else if( present - startTime > tweenDelay && startTime !== null ){
			var progress	= 1
			startTime	= null;
		}else {
			return
		}
		// 
		if( state === 'rest'){
			var positionY	= document.documentElement.clientHeight+500*progress		
		}else if( state === 'flying' ){
			var positionY	= document.documentElement.clientHeight+500*(1-progress)
		}else	console.assert(false)
		// set positionY
		armL.position.set( window.innerWidth/2- 400, positionY , 0);
		armR.position.set( window.innerWidth/2+ 400, positionY , 0);			
	})
	
	this.setState	= function(value){
		console.assert(value === 'rest' || value === 'flying')
		state		= value;
		startTime	= Date.now()/1000
	}
}

THREEx.SupermanArms.baseUrl	= '../'
