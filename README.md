THREEx v2 - guidelines to write extensions for three.js 

threex-v2 is an light extension system for three.js.
It isnt really a system, it is more a convention.
There provides no code, no tool for command lines.
It is guidelines how to write modules.

It is very vendor.js

i porting all my three.js code in it.

and i have quite a few by now.


It has no specific requirement about module management, how you get them, 
or how to load them.
You can use the way you like.
It is fitting well with ```package.require.js``` module management tho.
```package.require.js``` handle packages loading with require.js, another time only guidelines, very vendor.js.
You can store your extension the way you like.
If you pick npm, see ```npm4require``` guidelines, another which is vendor.js.
You can store and publish your packages thru npm, module mangement for node.js.

[readme driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)

the old threex is in [jeromeetienne/threex](https://github.com/jeromeetienne/threex-v0)


How To Write a THREEx Module
============================

First you declare ```THREEx``` namespace. This will works whenever ```THREEx``` 
is already defined or not. Thus you dont have any dependancy. This is a [vendor.js]()
namespace, so to say.

```
/**
 * declare THREEx namespace
 */
var THREEx	= THREEx	|| {};
```

Then you declare your module, up to you to know what it is supposed to do. But if you 
could document it in [jsdoc](http://usejsdoc.org/), i would be grateful :)

```
/**
 * THREEx module to do super things
 */
THREEx.SuperModule	= function( /* arguments... */ ){
	// here you put your own thing
};
```

## To Update Rendering of Your Module

If this module needs to be updated at each render, provide a function to update the
rendering of your module.

```
/**
 * function to be called at every render update
 * @param  {Number} delta number of seconds since last update
 * @param  {Number} now   Number of seconds since the begining
 */
this.update	= function(delta, now){
	// ... here you update the rendering of your module
}
```

### More cooked version

If you got many stuff to update, it may be nice to have an actual rendering
loop, like this one.

```
/**
 * All Update Functions
 * @type {Array}
 */
var updateFcts	= []

/**
 * function to be called at every render update
 * @param  {Number} delta number of seconds since last update
 * @param  {Number} now   Number of seconds since the begining
 */
this.update	= function(delta, now){
	updateFcts.forEach(function(updateFct){
		updateFct(delta, now)
	})
}
```

To add a function in this update loop, do

```
updateFcts.push(function callback(delta, now){
	// here you update a part of your module
})
```

to remove a functoin in this update loop, you can do

```
updateFcts.splice(updateFcts.indexOf(callback),1)
```



If needed, you can have a ```.destroy()``` function to act as explicit destructor

```
this.destroy	= function(){
	// here, clean things up
}
```

