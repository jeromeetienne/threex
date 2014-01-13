/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addToxicPasses2DatGui	= function(toxicPproc, datGui){
	datGui		= datGui || new dat.GUI()

	// put button for each button
	var presetLabels= Object.keys(THREEx.ToxicPproc.passesPreset)
	presetLabels.forEach(function(presetLabel){
		var options	= {}
		options[presetLabel]	= function(){
			toxicPproc.setPreset(presetLabel)			
		}
		datGui.add(options, presetLabel)
	})

	// vBlurPass
	var folder	= datGui.addFolder('Vertical Blur Pass');
	var uniforms	= toxicPproc.vBlurPass.uniforms
	folder.add(uniforms['v'], 'value')	.min(0.0).max(0.1).name("v").listen();

	// hBlurPass
	var folder	= datGui.addFolder('Horizontal Blur Pass');
	var uniforms	= toxicPproc.hBlurPass.uniforms
	folder.add(uniforms['h'], 'value')	.min(0.0).max(0.1).name("v").listen();

	// rgbRadialPass
	var folder	= datGui.addFolder('Rgb Shift Radial Pass');
	var uniforms	= toxicPproc.rgbRadialPass.uniforms
	folder.add(uniforms['factor'], 'value')	.min(0.0).max(0.1).name("factor").listen();
	folder.add(uniforms['power'], 'value')	.min(0.0).max(3.0).name("power").listen();

	// seeDoublePass
	var folder	= datGui.addFolder('SeeDouble Pass');
	var uniforms	= toxicPproc.seeDoublePass.uniforms
	folder.add(uniforms['radius'], 'value')		.min(0.0).max(1.0).name("radius").listen();
	folder.add(uniforms['timeSpeed'], 'value')	.min(0.0).max(1.0).name("timeSpeed").listen();
	folder.add(uniforms['mixRatio'], 'value')	.min(0.0).max(1.0).name("mixRatio").listen();
	folder.add(uniforms['opacity'], 'value')	.min(0.0).max(1.0).name("opacity").listen();

	// refractionPass
	var folder	= datGui.addFolder('Refraction Pass');
	var uniforms	= toxicPproc.refractionPass.uniforms
	folder.add(uniforms['timeSpeed'], 'value')	.min(0.0).max(3.0).name("timeSpeed").listen();
	folder.add(uniforms['Frequency'], 'value')	.min(0.0).max(50.0).name("Frequency").listen();
	folder.add(uniforms['RandomNumber'], 'value')	.min(0.0).max(2.0).name("RandomNumber").listen();
	folder.add(uniforms['Period'], 'value')		.min(0.0).max(4.0).name("Period").listen();
	folder.add(uniforms['Amplitude'], 'value')	.min(0.0).max(100.0).name("Amplitude").listen();
}
