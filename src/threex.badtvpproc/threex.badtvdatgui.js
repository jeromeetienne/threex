/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.addBadTVPasses2DatGui	= function(badTVPasses, datGui){
	datGui		= datGui || new dat.GUI()
	var onChange = function(){
		badTVPasses.onParamsChange()
	}
	onChange()
	
	//Init DAT GUI control panel
	var badTVParams	= badTVPasses.params.badTV
	var rgbParams	= badTVPasses.params.rgb
	var filmParams	= badTVPasses.params.film
	var staticParams= badTVPasses.params.staticNoise
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	datGui.add({ randomize	: function(){
		badTVPasses.params.randomize()
		badTVPasses.onParamsChange()		
	}}, 'randomize' )
	datGui.add({ reset	: function(){
		badTVPasses.params.reset()
		badTVPasses.onParamsChange()		
	}}, 'reset' )
	datGui.add(badTVPasses, 'tweenDelay', 0, 2).step(0.1).listen().name("Tween Delay").onChange(onChange);

	var f1 = datGui.addFolder('Bad TV');
	f1.add(badTVParams, 'distortion', 0.1, 20).step(0.1).listen().name("Thick Distort").onChange(onChange);
	f1.add(badTVParams, 'distortion2', 0.1, 20).step(0.1).listen().name("Fine Distort").onChange(onChange);
	f1.add(badTVParams, 'speed', 0.0,1.0).step(0.01).listen().name("Distort Speed").onChange(onChange);
	f1.add(badTVParams, 'rollSpeed', 0.0,1.0).step(0.01).listen().name("Roll Speed").onChange(onChange);
	f1.open();

	var f2 = datGui.addFolder('RGB Shift');
	f2.add(rgbParams, 'amount', 0.0, 0.1).listen().onChange(onChange);
	f2.add(rgbParams, 'angle', 0.0, 2.1).step(0.01).listen().onChange(onChange);
	f2.open();

	var f4 = datGui.addFolder('Static');
	f4.add(staticParams, 'amount', 0.0,1.0).step(0.01).listen().onChange(onChange);
	f4.add(staticParams, 'size2', 1.0,100.0).step(1.0).onChange(onChange);
	f4.open();

	var f3 = datGui.addFolder('Scanlines');
	f3.add(filmParams, 'count', 50, 1000).onChange(onChange);
	f3.add(filmParams, 'sIntensity', 0.0, 2.0).step(0.1).onChange(onChange);
	f3.add(filmParams, 'nIntensity', 0.0, 2.0).step(0.1).onChange(onChange);
	f3.open();
}