// This THREEx helper makes it even easier to use mouse events.
// It just a thin wrapper to include threex.mouseevents.js features
// directly in THREE.Object3D. It provide a sweat clean API.
// All the work is done in threex.mouseevents.js tho.
//
// # include it in your page
//
// ```
//     <script src='threex.mouseevents.js'></script>
//     <script src='threex.mouseevents.object3d.js'></script>
// ```
//
// # to bind an event
//
// ```mesh.on('click', function(object3d){ ... })```
//
// # to unbind an event
//
// ```mesh.off('click', function(object3d){ ... })```
//
// # Alternative API
//
// Its naming is closer DOM events. 
//
// ```mesh.addEventListener('click', function(object3d){ ... })```
// ```mesh.removeEventListener('click', function(object3d){ ... })```
//
// *Warning*: it modifies THREE.Object3D class. It is a global class, so it may be considered
// unclean by some. For this reason, this file is distinct from threex.mouseevents.js.
// It is a plugin, and it isnt required.
//
// # Code


// check that threex.mouseevents.js is included
console.assert(THREEx && THREEx.DomEvent, "threex.mouseevents.js MUST be included before");

// create the global instance of THREEx.DomEvent
THREE.Object3D._threexDomEvent	= new THREEx.DomEvent();

// # wrap mouseevents.bind()
THREE.Object3D.prototype.on	=
THREE.Object3D.prototype.addEventListener = function(eventName, callback){
	THREE.Object3D._threexDomEvent.bind(this, eventName, callback);
	return this;
}

// # wrap mouseevents.unbind()
THREE.Object3D.prototype.off	=
THREE.Object3D.prototype.removeEventListener	= function(eventName, callback){
	// TODO to code
	return this;
}
