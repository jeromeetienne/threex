// it may be generated automatically based on folders content
requirejs.config({
	paths	: {
		"src"	: "../src",
	},
	map	: {
		"*"	: {
			'threex.boilerplate'	: 'src/threex.boilerplate/package.require',
			'threex.context'	: 'src/threex.context/package.require',
			'threex.creators'	: 'src/threex.creators/package.require',
			'threex.loop'		: 'src/threex.loop/package.require',
			'threex.objectbuilders'	: 'src/threex.objectbuilders/package.require',
			'threex.queryselector'	: 'src/threex.queryselector/package.require',
			'threex.windowresize'	: 'src/threex.windowresize/package.require',
		},
	},
});
