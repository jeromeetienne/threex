# npm4require.js
## A Workflow For Managing Web Package With Npm.js And Require.js

npm4require doesnt include codes, no libraries or cmdline tools.
It is just a workflow. 

It is made to handle modules on the web.
It use 2 wellknown tools :
[npm.js](https://npmjs.org/) handles modules storing and versioning.
[require.js](http://requirejs.org) handles loading modules in the browser.
It is a very vendor.js way to handle packages.

## Module installation

* to install a module ```threex.loop``` 

```
npm install threex.loop
```

* it will install the module in ```./node_modules```

## modules loading

It is loaded with require.js. So first load require.js

```
<script src="vendor/require.js/require.js"></script>
```

here is an example of loading a modules with require.js

```
require(['node_modules/threex.loop/package.require'], function(){
})
```

## how to write a module ?

* publish a npm package for it, then add a ```package.require.js``` and you are done.



