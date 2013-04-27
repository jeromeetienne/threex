// it may be generated automatically based on folders content
requirejs.config({
	paths	: {
		"local_modules"	: "../local_modules",
	},
	map	: {
		"*"	: {
			'threex.context'	: 'local_modules/threex.context/package.require',
			'threex.creators'	: 'local_modules/threex.creators/package.require',
			'threex.loop'		: 'local_modules/threex.loop/package.require',
			'threex.mesh'		: 'local_modules/threex.mesh/package.require',
			'threex.queryselector'	: 'local_modules/threex.queryselector/package.require',
		},
	},
});
