Can Modules Have Name Alias To Ease Readability ?
=================================================
yes they can, here is a configuration you can use
It allows to load modules like below. better than the ```node_modules/threex.loop/package.require```

```
require(['myModule1', 'myModule2'], function(){
	// ...
})
```

* you create a ```node_modules/packageslist.require.js``` file to contains a cooked configuration
* cooked configuration aims to better readability

#### loading the package list
* this file must be included in your package after require.js

```
<script src="node_modules/packageslist.require.js"></script>
```

#### example content
* in ```node_modules/packageslist.require.js```

```
requirejs.config({
	paths	: {
		"npm4require"	: "../node_modules",
	},
	map	: {
		"*"	: {
			'threex.context'	: 'npm4require/threex.context/package.require',
			'threex.loop'		: 'npm4require/threex.loop/package.require',
			'threex.queryselector'	: 'npm4require/threex.queryselector/package.require',
		},
	},
});
```

## How to create the initial package.json

```
npm init
```

## how to publish npm package

```
npm publish
```

if you did update the version number since last publication, it will refuse to publish.
If needed you can update the version automatically then publish, just use this line 

```
npm version build && npm publish
```

## isnt it possible to load module directly from github or others

* it may be because of convenience or privacy. whatever

### from github
* yes, you go on the module github repo
* you get the url of the raw tgz
* you download it 

### any tgz/zip will do
* (or here you could use tgz from other sources, as long as the module has package.require.js)
* you just have to unpack .tgz in your modules directory

