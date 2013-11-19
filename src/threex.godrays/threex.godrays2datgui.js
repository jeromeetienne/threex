/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addGodRays2DatGui	= function(godRays, datGui){
	datGui		= datGui || new dat.GUI()
	var passes	= godRays.composer.passes
	var hBlurPass	= passes[1]
	var vBlurPass	= passes[2]
	var rBlurPass	= passes[3]

	datGui.add(hBlurPass.uniforms['h'], 'value').min(0.0).max(0.01).name('hBlurPass')
	datGui.add(vBlurPass.uniforms['v'], 'value').min(0.0).max(0.01).name('vBlurPass')

	datGui.add(rBlurPass.uniforms['fExposure'], 'value')	.min(0.0).max(2.0).name("Exposure");
	datGui.add(rBlurPass.uniforms['fDecay'], 'value')	.min(0.6).max(2.0).name("Decay");
	datGui.add(rBlurPass.uniforms['fDensity'], 'value')	.min(0.0).max(2.0).name("Density");
	datGui.add(rBlurPass.uniforms['fWeight'], 'value')	.min(0.0).max(2.0).name("Weight");
	datGui.add(rBlurPass.uniforms['fClamp'], 'value')	.min(0.0).max(2.0).name("Clamp");
}