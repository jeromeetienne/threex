/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addGodRays2DatGui	= function(glow, datGui){
	datGui		= datGui || new dat.GUI()
	var passes	= glow.composer.passes
	var hBlurPass1	= passes[1]
	var vBlurPass1	= passes[2]
	var hBlurPass2	= passes[3]
	var vBlurPass2	= passes[4]
	var rBlurPass	= passes[5]

	datGui.add(hBlurPass1.uniforms['h'], 'value').min(0.0).max(0.01).name('hBlurPass1')
	datGui.add(vBlurPass1.uniforms['v'], 'value').min(0.0).max(0.01).name('vBlurPass1')
	datGui.add(hBlurPass2.uniforms['h'], 'value').min(0.0).max(0.01).name('hBlurPass2')
	datGui.add(vBlurPass2.uniforms['v'], 'value').min(0.0).max(0.01).name('vBlurPass2')

	datGui.add(rBlurPass.uniforms.fExposure, 'value')	.min(0.0).max(1.0).step(0.01).name("Exposure");
	datGui.add(rBlurPass.uniforms.fDecay, 'value')		.min(0.6).max(1.0).step(0.01).name("Decay");
	datGui.add(rBlurPass.uniforms.fDensity, 'value')	.min(0.0).max(1.0).step(0.01).name("Density");
	datGui.add(rBlurPass.uniforms.fWeight, 'value')		.min(0.0).max(1.0).step(0.01).name("Weight");
	datGui.add(rBlurPass.uniforms.fClamp, 'value')		.min(0.0).max(1.0).step(0.01).name("Clamp");
}