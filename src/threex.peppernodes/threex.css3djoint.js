var THREEx	= THREEx	|| {}

// from three.js examples/css3d_molecules.html
THREEx.CSS3DJoint	= function(srcPosition, dstPosition){

	this.object3d	= new THREE.Object3D()
	this.srcMargin	= 64/2
	this.dstMargin	= 64/2

	this.object3d	= new THREE.Object3D()


	var domElement	= document.createElement( 'div' );
	domElement.className	= "bond";
	var objectBlade1= new THREE.CSS3DObject( domElement );
	this.object3d.add(objectBlade1)

	var tmpVec1	= new THREE.Vector3
	var tmpVec2	= new THREE.Vector3
	var tmpVec3	= new THREE.Vector3
	var tmpVec4	= new THREE.Vector3
	this.update	= function(){
		//////////////////////////////////////////////////////////////////
		//								//
		//////////////////////////////////////////////////////////////////

		tmpVec1.subVectors( dstPosition, srcPosition );

		var bondLength		= tmpVec1.length();

		var domElement		= objectBlade1.element
		domElement.style.height	= (bondLength-(this.srcMargin+this.dstMargin)) + "px";

		var objectCSS3d		= objectBlade1
		tmpVec2.copy( tmpVec1 ).normalize()
		tmpVec3.copy(tmpVec2).multiplyScalar( this.srcMargin).add(srcPosition)
		tmpVec4.copy(tmpVec2).multiplyScalar(-this.dstMargin).add(dstPosition)
		objectCSS3d.position.copy( tmpVec3 ).add( tmpVec4 ).multiplyScalar(0.5)

		//
		var axis	= tmpVec2.set( 0, 1, 0 ).cross( tmpVec1 );
		var radians	= Math.acos( tmpVec3.set( 0, 1, 0 ).dot( tmpVec4.copy( tmpVec1 ).normalize() ) );

		// setup rotation
		var matrix	= new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
		objectCSS3d.matrix	= matrix;
		objectCSS3d.rotation.setFromRotationMatrix( objectCSS3d.matrix, objectCSS3d.rotation.order );

		// objectCSS3d.matrixAutoUpdate = false;
// TODO original had 2 sides, so better 3d representation
	}
}
