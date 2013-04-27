# ./package.require.js
* this is a file in javascript, it contains the code to load the module with require.js
  * this file with be required by require.js when loading the module
  * so it is a require.js related function - see require.js docs for how to do it
* this file MUST exist



## FAQs

## Basic examples

* for example, the ```package.require.js``` to load a single javascript file ```index.js``` 

```
define( [ './index.js',
	], function(){
});
```

### how to generate initial package.require.js file

You can try this one liner. it works for me.

```
find ./* -type d | sed 's/^\.\///' |  awk 'BEGIN {print "requirejs.config({\n\tmap: {\n\t\t\"*\"\t:";} { print "\t\t\t\"" $1 "\" : \"npm4require/" $1 "/package.require"} END{print "\t\t}\n\t}\n};";}' > cookedpackages.require.js'
```