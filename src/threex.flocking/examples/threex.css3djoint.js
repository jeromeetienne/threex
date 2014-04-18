var THREEx	= THREEx	|| {}
THREEx.CSS3DJoint	= function(srcPosition, dstPosition){

	this.object3d	= new THREE.Object3D()
	this.srcMargin	= 55/2;
	this.dstMargin	= 55/2;

	var domElement	= document.createElement( 'div' );
	domElement.className	= "bond";
	var objectBlade1= new THREE.CSS3DObject( domElement );
	this.object3d	= objectBlade1

	// var domElement	= document.createElement( 'div' );
	// domElement.className	= "bond";
	// var objectBlade2= new THREE.CSS3DObject( domElement );
	// this.object3d.add(objectBlade2)

	var tmpVec1	= new THREE.Vector3
	var tmpVec2	= new THREE.Vector3
	var tmpVec3	= new THREE.Vector3
	var tmpVec4	= new THREE.Vector3
	this.update	= function(){
		var objectCSS3d	= objectBlade1

		tmpVec1.subVectors( dstPosition, srcPosition );

		var bondLength		= tmpVec1.length();

		var domElement		= objectCSS3d.element
		domElement.style.height	= (bondLength-(this.srcMargin+this.dstMargin)) + "px";

		objectCSS3d.position.copy( srcPosition ).add( dstPosition ).multiplyScalar(0.5)

		//
		var axis	= tmpVec2.set( 0, 1, 0 ).cross( tmpVec1 );
		var radians	= Math.acos( tmpVec3.set( 0, 1, 0 ).dot( tmpVec4.copy( tmpVec1 ).normalize() ) );

		// setup rotation
		var matrix	= new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
		objectCSS3d.matrix	= matrix;
		objectCSS3d.rotation.setFromRotationMatrix( objectCSS3d.matrix, objectCSS3d.rotation.order );

		// objectCSS3d.matrixAutoUpdate = false;
	}
}
