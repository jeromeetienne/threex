/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};


THREEx.addFlockingControls2DatGui	= function(flockingControls, datGui){
	var opts	= flockingControls.opts
	datGui		= datGui || new dat.GUI()


	var folder	= datGui.addFolder('cohesion');
	folder.add(opts, 'cohesionMaxLength')		.min(0.0).max(0.1)	.name('maxLength')
	folder.add(opts, 'cohesionWeight')		.min(0.0).max(4)	.name('weight')
	folder.open()
	var folder	= datGui.addFolder('alignement');
	folder.add(opts, 'alignementMaxLength')		.min(0.0).max(0.1)	.name('maxLength')
	folder.add(opts, 'alignementWeight')		.min(0.0).max(4)	.name('weight')
	folder.open()
	var folder	= datGui.addFolder('separation');
	folder.add(opts, 'separationMaxLength')		.min(0.0).max(0.1)	.name('maxLength')
	folder.add(opts, 'separationWeight')		.min(0.0).max(4)	.name('weight')
	folder.open()
	var folder	= datGui.addFolder('radius');
	folder.add(opts, 'neighbourRadius')		.min(0.0).max(5)	.name('neightbour')
	folder.add(opts, 'separationRadius')		.min(0.0).max(5)	.name('seperation')
	folder.open()
	var folder	= datGui.addFolder('move');
	folder.add(opts, 'maxSpeed')		.min(0.0).max(5)	.name('max speed')
	folder.add(opts, 'damping')		.min(0.0).max(1)	.name('damping')
	folder.open()
}