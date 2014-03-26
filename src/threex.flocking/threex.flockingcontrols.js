var THREEx	= THREEx	|| {}

THREEx.FlockingControls	= function(object3d){
	// export object3d
	this.object3d	= object3d
	
	// physics constant
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	var acceleration= new THREE.Vector3()
	this.acceleration=acceleration
	var damping	= new THREE.Vector3(1,1,1)
	this.damping	= damping

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.applyForces	= function(){
		// handle physics
		velocity.multiply(damping)
		velocity.add(acceleration)
		acceleration.set(0,0,0)
		// update object3d position
		object3d.position.add(velocity)
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		computeForces functions stack					//
	//////////////////////////////////////////////////////////////////////////////////

	var onComputeForces	= []
	this.computeForces	= function(others, controlsIdx){
		onComputeForces.forEach(function(fn){
			fn(others, controlsIdx)
		})
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		constant							//
	//////////////////////////////////////////////////////////////////////////////////
	var neighbourRadius	= 3
	var maxSteerForce	= 0.001;
	var desiredSeparation	= 0.3
	var separationFactor	= 0.005
	
	//////////////////////////////////////////////////////////////////////////////////
	//		alignement							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others, controlsIdx){
// return
		var velSum	= new THREE.Vector3()
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// if ( Math.random() > 0.6 ) continue;

			var other	= others[i];
			var distance	= other.object3d.position.distanceTo( object3d.position );

			if( distance > 0 && distance <= neighbourRadius ){
				velSum.add( other.velocity );
				count++;
			}
		}
		// compute the average
		velSum.divideScalar( count !== 0 ? count : 1);

		if( velSum.length() > maxSteerForce )	velSum.setLength(maxSteerForce)

		// apply the force to acceleration
		this.acceleration.add(velSum)
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		cohesion							//
	//////////////////////////////////////////////////////////////////////////////////
	
	onComputeForces.push(function(others, controlsIdx){
// return
		var posSum	= new THREE.Vector3();
		var count	= 0;

		for(var i = 0; i < others.length; i++){
			// if( Math.random() > 0.6 ) continue;

			var other	= others[i];
			var distance	= other.object3d.position.distanceTo( object3d.position );

			if( distance > 0 && distance <= neighbourRadius ){
				posSum.add( other.object3d.position );
				count++;
			}
		}
		// compute the average
		posSum.divideScalar( count !== 0 ? count : 1);

		var force	= posSum.clone().sub(this.object3d.position);
		if( force.length() > maxSteerForce )	force.setLength(maxSteerForce)

		// apply the force to acceleration
		this.acceleration.add(force)
	}.bind(this))

	//////////////////////////////////////////////////////////////////////////////////
	//		separation							//
	//////////////////////////////////////////////////////////////////////////////////
	onComputeForces.push(function(others, controlsIdx){
		var posSum	= new THREE.Vector3();
		var count	= 0;
		var repulse	= new THREE.Vector3();
// return
		for(var i = 0; i < others.length; i++ ){
			// if( Math.random() > 0.6 )	continue;
			var other	= others[i];
			var distance	= other.object3d.position.distanceTo( object3d.position );

			if( distance > 0 && distance <= desiredSeparation ){
				repulse.subVectors( object3d.position, other.object3d.position );
				repulse.normalize();
				repulse.divideScalar( distance );
				posSum.add( repulse );
				count++;
			}
		}
		// compute the average
		posSum.divideScalar( count !== 0 ? count : 1);
		posSum.multiplyScalar(separationFactor)
		// apply the force to acceleration
		this.acceleration.add(posSum)
	}.bind(this))
}


// directly from tween.js
THREEx.FlockingControls.Easing = {

	Linear: {

		None: function ( k ) {

			return k;

		}

	},

	Quadratic: {

		In: function ( k ) {

			return k * k;

		},

		Out: function ( k ) {

			return k * ( 2 - k );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
			return - 0.5 * ( --k * ( k - 2 ) - 1 );

		}

	},

	Cubic: {

		In: function ( k ) {

			return k * k * k;

		},

		Out: function ( k ) {

			return --k * k * k + 1;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
			return 0.5 * ( ( k -= 2 ) * k * k + 2 );

		}

	},

	Quartic: {

		In: function ( k ) {

			return k * k * k * k;

		},

		Out: function ( k ) {

			return 1 - ( --k * k * k * k );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
			return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

		}

	},

	Quintic: {

		In: function ( k ) {

			return k * k * k * k * k;

		},

		Out: function ( k ) {

			return --k * k * k * k * k + 1;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
			return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

		}

	},

	Sinusoidal: {

		In: function ( k ) {

			return 1 - Math.cos( k * Math.PI / 2 );

		},

		Out: function ( k ) {

			return Math.sin( k * Math.PI / 2 );

		},

		InOut: function ( k ) {

			return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

		}

	},

	Exponential: {

		In: function ( k ) {

			return k === 0 ? 0 : Math.pow( 1024, k - 1 );

		},

		Out: function ( k ) {

			return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

		},

		InOut: function ( k ) {

			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
			return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

		}

	},

	Circular: {

		In: function ( k ) {

			return 1 - Math.sqrt( 1 - k * k );

		},

		Out: function ( k ) {

			return Math.sqrt( 1 - ( --k * k ) );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
			return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

		},

		Out: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

		},

		InOut: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
			return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

		}

	},

	Back: {

		In: function ( k ) {

			var s = 1.70158;
			return k * k * ( ( s + 1 ) * k - s );

		},

		Out: function ( k ) {

			var s = 1.70158;
			return --k * k * ( ( s + 1 ) * k + s ) + 1;

		},

		InOut: function ( k ) {

			var s = 1.70158 * 1.525;
			if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
			return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

		}

	},

	Bounce: {

		In: function ( k ) {

			return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

		},

		Out: function ( k ) {

			if ( k < ( 1 / 2.75 ) ) {

				return 7.5625 * k * k;

			} else if ( k < ( 2 / 2.75 ) ) {

				return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

			} else if ( k < ( 2.5 / 2.75 ) ) {

				return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

			} else {

				return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

			}

		},

		InOut: function ( k ) {

			if ( k < 0.5 ) return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
			return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

		}

	}

};
